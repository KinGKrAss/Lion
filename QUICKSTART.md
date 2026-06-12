# 🚀 QUICK START GUIDE

## ⚡ 30 Sekunden Installation

### Linux / Mac
```bash
git clone https://github.com/KinGKrAss/Lion.git
cd Lion
bash install.sh
```

### Windows
```bash
git clone https://github.com/KinGKrAss/Lion.git
cd Lion
install.bat
```

### Android (Termux)
```bash
pkg install nodejs git
git clone https://github.com/KinGKrAss/Lion.git
cd Lion
bash termux-install.sh
```

---

## 🔑 API Key Setup (2 Minuten)

1. Go to: https://aistudio.google.com
2. Click "Create API Key"
3. Copy the key
4. Edit `.env.local` and paste:
   ```
   GEMINI_API_KEY=your_key_here
   ```

---

## ▶️ Start Application

```bash
npm run dev
```

**Open Browser:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## 📱 Deploy to Cloud (Free)

### Railway.app (Recommended)

```bash
bash deploy-railway.sh
```

Then:
1. Sign in with GitHub
2. Connect repo
3. Add GEMINI_API_KEY
4. Deploy!

**Live URL will be:** `https://lingolion-xxxx.railway.app`

---

## 🐳 Docker Deployment

```bash
docker-compose up --build
```

Open: http://localhost:5000

---

## ✅ Verify Installation

```bash
# Check backend
curl http://localhost:5000/api/health

# Should return:
# {"status":"ok","timestamp":"...","uptime":...}
```

---

## 📂 Project Files

```
Lion/
├── src/                    # React frontend
│   ├── components/         # UI components
│   ├── services/           # API client
│   ├── App.tsx             # Main app
│   └── index.css           # Styles
├── server.ts               # Express backend
├── package.json            # Dependencies
├── install.sh              # Auto install (Linux/Mac)
├── install.bat             # Auto install (Windows)
├── Dockerfile              # Docker config
├── docker-compose.yml      # Docker compose
└── README.md               # Full documentation
```

---

## 🎓 How to Use

1. **Landing Page** → Learn about LingoLion
2. **Select Language** → Choose Spanish, French, German, etc.
3. **Pick Scenario** → Café, Hotel, Interview, Networking
4. **Chat with AI** → Real-time conversation in your chosen language
5. **Get Feedback** → AI corrects and explains mistakes

---

## 🆘 Troubleshooting

### "npm: command not found"
→ Install Node.js from https://nodejs.org

### "Cannot connect to API"
→ Make sure backend is running: `npm run server:dev`

### "Gemini API Error"
→ Check API key in `.env.local` is correct

### "Port 5000 already in use"
→ Change port: `PORT=5001 npm run server:dev`

---

## 📚 Full Documentation

- **README.md** - Complete guide
- **ANDROID_DEPLOYMENT.md** - Mobile setup
- **API Docs** - Endpoints reference

---

## 💬 Support

- **Email:** admin@kingkrass.com
- **GitHub Issues:** https://github.com/KinGKrAss/Lion/issues
- **Discussions:** https://github.com/KinGKrAss/Lion/discussions

---

## 🎯 Next Steps

- [ ] Clone repo
- [ ] Run install script
- [ ] Get Gemini API key
- [ ] Add key to .env.local
- [ ] Run `npm run dev`
- [ ] Open http://localhost:3000
- [ ] Deploy to Railway
- [ ] Share live URL

---

**Made with 🦁 by Royal KrAss Group**
