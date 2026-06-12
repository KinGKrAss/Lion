/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * LingoLion Backend Server
 * Full-featured Express server with authentication, chat API, and contact forms
 */

import express, { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { GoogleGenerativeAI } from '@google/genai';

config();

const app = express();
const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@kingkrass.com';
const SMTP_HOST = process.env.SMTP_HOST || 'localhost';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';

// Database file paths
const DB_DIR = path.join(process.cwd(), 'data');
const USERS_DB = path.join(DB_DIR, 'users.json');
const CONTACTS_DB = path.join(DB_DIR, 'contacts.json');
const CHATS_DB = path.join(DB_DIR, 'chats.json');

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initialize databases
interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: number;
  lastLogin: number | null;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  createdAt: number;
}

interface ChatSession {
  id: string;
  userId: string;
  language: string;
  scenario: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
  }>;
  createdAt: number;
  updatedAt: number;
}

const initializeDB = (filePath: string, defaultData: object) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
};

initializeDB(USERS_DB, []);
initializeDB(CONTACTS_DB, []);
initializeDB(CHATS_DB, []);

// Utility functions
const readDB = (filePath: string): any[] => {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const writeDB = (filePath: string, data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const hashPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const generateToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Email transporter
const emailTransporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
});

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.static('dist'));

// CORS Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Authentication middleware
const authMiddleware = (req: Request & { userId?: string }, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(); // Allow unauthenticated requests
  }

  const token = authHeader.substring(7);
  const users = readDB(USERS_DB) as User[];
  // In production, use JWT. This is simplified for the MVP.
  req.userId = token;
  next();
};

app.use(authMiddleware);

// ============================================
// Authentication Routes
// ============================================

app.post('/api/auth/register', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const users = readDB(USERS_DB) as User[];
    if (users.some(u => u.email === email)) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      passwordHash: hashPassword(password),
      createdAt: Date.now(),
      lastLogin: null,
    };

    users.push(newUser);
    writeDB(USERS_DB, users);

    res.status(201).json({
      message: 'User registered successfully',
      userId: newUser.id,
      email: newUser.email,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const users = readDB(USERS_DB) as User[];
    const user = users.find(u => u.email === email);

    if (!user || user.passwordHash !== hashPassword(password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    user.lastLogin = Date.now();
    writeDB(USERS_DB, users);

    const token = generateToken();

    res.json({
      message: 'Login successful',
      userId: user.id,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ============================================
// Chat API Routes (with Gemini AI)
// ============================================

app.post('/api/chat', async (req: Request & { userId?: string }, res: Response) => {
  try {
    const { message, language, scenario, sessionId } = req.body;

    if (!message || !GEMINI_API_KEY) {
      return res.status(400).json({ error: 'Message and API key required' });
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemPrompt = `You are a language learning assistant for the scenario: ${scenario}.
The user is learning ${language}.
Keep responses educational, encouraging, and provide corrections/explanations when needed.
Always respond in ${language} but include English translations when helpful.`;

    const response = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: `${systemPrompt}\n\nUser message: ${message}`,
        }],
      }],
    });

    const assistantMessage = response.response.text();

    // Save chat to database
    if (sessionId) {
      const chats = readDB(CHATS_DB) as ChatSession[];
      const chat = chats.find(c => c.id === sessionId);
      if (chat) {
        chat.messages.push(
          { role: 'user', content: message, timestamp: Date.now() },
          { role: 'assistant', content: assistantMessage, timestamp: Date.now() }
        );
        chat.updatedAt = Date.now();
        writeDB(CHATS_DB, chats);
      }
    }

    res.json({
      message: assistantMessage,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Chat API error' });
  }
});

app.post('/api/chat/session', (req: Request & { userId?: string }, res: Response) => {
  try {
    const { language, scenario } = req.body;
    const userId = req.userId || 'anonymous';

    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      userId,
      language,
      scenario,
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const chats = readDB(CHATS_DB) as ChatSession[];
    chats.push(newSession);
    writeDB(CHATS_DB, chats);

    res.status(201).json(newSession);
  } catch (error) {
    console.error('Session creation error:', error);
    res.status(500).json({ error: 'Session creation failed' });
  }
});

// ============================================
// Contact Form API
// ============================================

app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, topic, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message required' });
    }

    const newContact: Contact = {
      id: crypto.randomUUID(),
      name,
      email,
      topic: topic || 'General Inquiry',
      message,
      status: 'new',
      createdAt: Date.now(),
    };

    const contacts = readDB(CONTACTS_DB) as Contact[];
    contacts.push(newContact);
    writeDB(CONTACTS_DB, contacts);

    // Send email notification
    if (SMTP_USER && SMTP_PASS) {
      await emailTransporter.sendMail({
        from: SMTP_USER,
        to: ADMIN_EMAIL,
        subject: `New Contact: ${topic || 'General Inquiry'}`,
        html: `
          <h2>New Message from ${name}</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Topic:</strong> ${topic || 'General'}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });
    }

    res.status(201).json({
      message: 'Contact form submitted successfully',
      contactId: newContact.id,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Contact form submission failed' });
  }
});

app.get('/api/contact/:id', (req: Request & { userId?: string }, res: Response) => {
  try {
    const contacts = readDB(CONTACTS_DB) as Contact[];
    const contact = contacts.find(c => c.id === req.params.id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
});

// ============================================
// Admin Routes
// ============================================

app.get('/api/admin/contacts', (req: Request & { userId?: string }, res: Response) => {
  try {
    // In production, verify admin authorization here
    const contacts = readDB(CONTACTS_DB) as Contact[];
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

app.patch('/api/admin/contact/:id/status', (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const contacts = readDB(CONTACTS_DB) as Contact[];
    const contact = contacts.find(c => c.id === req.params.id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    contact.status = status;
    writeDB(CONTACTS_DB, contacts);

    res.json({ message: 'Status updated', contact });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// ============================================
// Health Check
// ============================================

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ============================================
// 404 Fallback & SPA support
// ============================================

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🦁 LingoLion Backend Server          ║
╚════════════════════════════════════════╝

  Server:   http://localhost:${PORT}
  API:      http://localhost:${PORT}/api
  Health:   http://localhost:${PORT}/api/health

  Environment:
  - GEMINI_API_KEY: ${GEMINI_API_KEY ? '✓ Configured' : '✗ Missing'}
  - Email Support:  ${SMTP_USER ? '✓ Configured' : '✗ Not configured (optional)'}
  - Database:       ${DB_DIR}

  Ready to serve! 🚀
  `);
});

export default app;
