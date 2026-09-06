# 🦁 Lion/Z1

**Royal KrAss Group** | Mobile-geeignete Projektoberfläche für Lion/Z1 und ZOE AI

![License](https://img.shields.io/badge/license-Apache%202.0-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![Status](https://img.shields.io/badge/status-Web--first%20Android%20Path-gold)

---

## 🌟 Overview

**Lion/Z1** ist eine Weboberfläche für Projektorganisation, Modulstatus, Aufgaben und ZOE-AI-gestützte Analysen. Der aktuelle Stand dieses Repositories ist bewusst **web-first**:

- 🧠 **Lion/Z1-Module** für CORE, GAIA, FORTUNA, ELECTRA, DIPLOMATIE und ZOE AI
- 📱 **Responsive Mobile-Web-UX** für Android-Browser und Touch-Bedienung
- 💬 **Serverseitige AI-Anbindung** über das Backend; keine Gemini-Secrets im Client
- ✅ **Verifizierter Build- und Typecheck-Pfad** mit `npm run lint` und `npm run build`
- ⚠️ **Keine native Android-App im Repository** und derzeit **keine echte Offline-PWA**

---

## 📱 Android-Supportstatus

- **Vorhanden:** Responsive React/Vite-Web-App mit Express-Backend
- **Nicht vorhanden:** `android/`, React Native, Capacitor, Service Worker oder Web-App-Manifest
- **Aktuell nutzbar auf Android:** im mobilen Browser, über „Zum Startbildschirm hinzufügen“ als Browser-Verknüpfung oder lokal via Termux
- **Noch offen für native Android-Unterstützung:** Manifest/Icons + Service Worker ergänzen und anschließend einen Wrapper wie Trusted Web Activity oder Capacitor integrieren
- **Sicherheitsgrenze:** `GEMINI_API_KEY` bleibt serverseitig; keine Secrets in `src/`

## 🧪 Build- / Teststatus

Die folgenden vorhandenen Befehle wurden für diesen Stand erfolgreich ausgeführt:

```bash
npm install
npm run lint
npm run build
```

Für die Backend-Prüfung kann zusätzlich `npm run server:dev` gestartet und anschließend `GET /api/health` geprüft werden.

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

### Option 1: **Android Device**

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

#### **B) Browser-Verknüpfung / Add to Home Screen**

Der aktuelle Stand kann auf Android zum Startbildschirm hinzugefügt werden:
1. Bereitgestellte URL in Chrome öffnen
2. Menü → „Zum Startbildschirm hinzufügen“
3. Startet wie eine Web-App, benötigt aber weiterhin Netzwerkzugriff

### Option 2: **Cloud Deployment (Recommended for Production)**

#### **Railway.app** (ein möglicher Hosting-Pfad)

```bash
# 1. Repository mit Railway verbinden
# 2. Node.js-Build automatisch erkennen lassen
# 3. Environment-Variablen im Railway-Dashboard setzen:
# GEMINI_API_KEY=...
# ADMIN_EMAIL=...
```

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
│   │   ├── SetupPanel.tsx       # Sprach- und Modulauswahl
│   │   └── ChatInterface.tsx    # Lion/Z1-Dialogoberfläche
│   ├── services/
│   │   └── api.ts              # API client
│   ├── types.ts                # TypeScript interfaces
│   ├── constants.ts            # Sprachen & Module
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
