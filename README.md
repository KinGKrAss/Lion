# 🦁 LingoLion - AI-Powered Language Learning Platform

**Royal KrAss Group** | Language Mastery through Immersive AI Conversations

![License](https://img.shields.io/badge/license-Apache%202.0-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![Status](https://img.shields.io/badge/status-Production%20Ready-brightgreen)

---

## 🌟 Overview

**LingoLion** is a full-stack, AI-powered language learning platform that combines:

- 🤖 **Advanced AI Tutors** (Google Gemini API)
- 🌍 **7 Languages** (Spanish, French, German, Italian, Japanese, Korean, Chinese)
- 🎭 **4+ Immersive Scenarios** (Café, Hotel, Interview, Networking)
- ⚡ **Real-time Conversations** with instant feedback and corrections
- 🎨 **Premium UI** with smooth animations and responsive design
- 🔐 **Full Authentication** system
- 💾 **Chat History & Progress Tracking**
- 📧 **Contact Management** system

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Git**
- **Gemini API Key** (get it free at [Google AI Studio](https://aistudio.google.com))
- Optional: **SMTP credentials** for email notifications

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/KinGKrAss/Lion.git
cd Lion

# 2. Install dependencies
npm install

# 3. Create .env.local file with your API keys
cp .env.example .env.local

# Edit .env.local and add:
# GEMINI_API_KEY=your_api_key_here
# VITE_API_URL=http://localhost:5000
```

### Running Locally

```bash
# Development mode (frontend + backend together)
npm run dev

# Frontend only (http://localhost:3000)
npm run client:dev

# Backend only (http://localhost:5000)
npm run server:dev

# Production build
npm run build
npm run start
```

Then open **http://localhost:3000** in your browser.

---

## 📱 Deployment Options

### Option 1: **Android Device (Recommended for Learning)**

For Android, you have **2 choices**:

#### **A) Using Termux (Most Practical)**

1. Install **Termux** from Google Play Store
2. In Termux:
   ```bash
   pkg update && pkg upgrade
   pkg install nodejs git
   git clone https://github.com/KinGKrAss/Lion.git
   cd Lion
   cp .env.example .env.local
   # Edit with nano: nano .env.local
   npm install
   npm run dev
   ```
3. Access via browser: `http://localhost:3000`

#### **B) Progressive Web App (PWA) - Works Offline**

The app can be installed as a PWA:
1. Open in Chrome: `https://lingolion.example.com` (when deployed)
2. Tap menu → "Install app"
3. Works offline with cached conversations

### Option 2: **Cloud Deployment (Recommended for Production)**

#### **Railway.app** (Easiest - Free tier available)

```bash
# 1. Push to GitHub
git push origin main

# 2. Connect Railway to GitHub repo
# 3. Railway auto-detects Node.js and builds automatically

# 4. Set environment variables in Railway dashboard:
# GEMINI_API_KEY=...
# ADMIN_EMAIL=...
```

**Live URL**: `https://lingolion-production.railway.app`

#### **Vercel** (Frontend only)

```bash
npm run build
# Drag & drop dist folder to vercel.com
```

#### **Heroku** (Full Stack)

```bash
heroku create lingolion
heroku config:set GEMINI_API_KEY=your_key
git push heroku main
```

#### **Docker** (For any server)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

### Option 3: **Desktop/Laptop (Development)**

```bash
npm run dev
# Access on any device on same network:
# http://[your-ip]:3000
```

---

## 📁 Project Structure

```
Lion/
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx      # Hero & features
│   │   ├── SetupPanel.tsx       # Language/scenario selection
│   │   └── ChatInterface.tsx    # AI conversation interface
│   ├── services/
│   │   └── api.ts              # API client
│   ├── types.ts                # TypeScript interfaces
│   ├── constants.ts            # Languages & scenarios
│   ├── App.tsx                 # Main component
│   ├── main.tsx                # React entry point
│   └── index.css               # Tailwind styles
├── server.ts                    # Express backend
├── package.json                # Dependencies
├── vite.config.ts              # Frontend build config
├── tailwind.config.js          # Styling
└── index.html                  # HTML entry point
```

---

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login & get token

### Chat
- `POST /api/chat/session` - Create chat session
- `POST /api/chat` - Send message & get AI response

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact/:id` - Get contact details

### Admin
- `GET /api/admin/contacts` - List all contacts
- `PATCH /api/admin/contact/:id/status` - Update status

### Health
- `GET /api/health` - Server health check

---

## 🎨 Technologies Used

**Frontend:**
- React 19 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons
- Vite for bundling

**Backend:**
- Express.js for API server
- Google Generative AI (Gemini)
- Nodemailer for emails
- File-based database (SQLite alternative)

**DevTools:**
- TypeScript for type safety
- ESLint & Prettier for code quality

---

## 🔐 Environment Variables

Create `.env.local`:

```env
# Frontend
VITE_API_URL=http://localhost:5000

# Backend - AI
GEMINI_API_KEY=your_gemini_api_key

# Backend - Server
PORT=5000
APP_URL=http://localhost:5000

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=admin@kingkrass.com
```

**Get Gemini API Key:**
1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Click "Create API Key"
3. Select your Google Cloud project
4. Copy key into `.env.local`

---

## 📚 How It Works

### User Journey

1. **Landing Page** → User sees features & benefits
2. **Setup Panel** → Select language & learning scenario
3. **Chat Interface** → Real-time conversation with AI tutor
4. **Features:**
   - 🎧 Text-to-speech (browser native)
   - 📋 Copy message text
   - 💾 Persistent chat history
   - 🔄 Switch scenarios anytime

### AI Flow

```
User Input
    ↓
[API: /api/chat] → Express Server
    ↓
[Gemini API] → Generate contextual response
    ↓
Response → Saved to database
    ↓
Display to User
```

---

## 🐛 Troubleshooting

### "Cannot connect to API"
```bash
# Check backend is running
npm run server:dev

# Check VITE_API_URL in .env.local
echo $VITE_API_URL
```

### "Gemini API Error"
```bash
# Verify API key is valid
# Check at: aistudio.google.com/app/apikey

# Update .env.local with correct key
# Restart server: npm run server:dev
```

### "Port 5000 already in use"
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=5001 npm run server:dev
```

---

## 📊 Development Commands

```bash
npm run dev              # Start both frontend & backend
npm run client:dev       # Frontend only
npm run server:dev       # Backend only
npm run build            # Production build
npm run lint             # Type check
npm run format           # Auto-format code
npm run clean            # Remove build artifacts
```

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📄 License

Apache License 2.0 - See LICENSE file for details

---

## 👑 Royal KrAss Group

**LingoLion** - *Language Mastery with Royal Precision*

🦁 Berlin Genesis · Digital Sovereignty · Strategic Excellence

---

## 🆘 Support

- 📧 Email: admin@kingkrass.com
- 🐛 Issues: [GitHub Issues](https://github.com/KinGKrAss/Lion/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/KinGKrAss/Lion/discussions)

---

**Made with 🦁 by Royal KrAss Group**
