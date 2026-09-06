# Lion/Z1 - Android & Mobile Deployment Guide

## ✅ Aktueller Status

- Dieses Repository enthält **keine native Android-App**, kein React Native, kein Capacitor und aktuell auch **kein Web-App-Manifest / keinen Service Worker**.
- Der heute unterstützte Android-Pfad ist deshalb: **responsive Mobile-Web-App im Browser** oder lokale Nutzung via **Termux**.
- „Zum Startbildschirm hinzufügen“ funktioniert als Browser-Verknüpfung, **nicht** als bestätigte Offline-PWA.
- `GEMINI_API_KEY` bleibt serverseitig in `.env.local`; keine Secrets in der Client-App hinterlegen.

## 📱 Android Installation Methods

### Method 1: Termux Terminal (Recommended)

**What is Termux?**
Linux terminal emulator for Android that runs Node.js, Git, and other tools.

**Step 1: Install Termux**
```
1. Open Google Play Store
2. Search: "Termux"
3. Install by Fredrik Fornlid
```

**Step 2: Setup in Termux**
```bash
# Update packages
pkg update && pkg upgrade -y

# Install Node.js and Git
pkg install nodejs git nano

# Clone Lion/Z1
git clone https://github.com/KinGKrAss/Lion.git
cd Lion

# Create environment file
cp .env.example .env.local

# Edit with nano
nano .env.local
# Add: GEMINI_API_KEY=your_key_here
# Press: Ctrl+X, then Y, then Enter to save

# Install dependencies (takes ~5 minutes)
npm install

# Start development server
npm run dev
```

**Step 3: Access on Android**
```
Open Chrome browser:
http://localhost:3000
```

**Step 4: Keep Running**
- Keep Termux app running in background
- Don't swipe it away from recent apps
- App will stay online as long as Termux is open

---

### Method 2: Browser Shortcut on Android

**When deployed:**

1. Open app in Chrome browser
2. Tap 3-dot menu → "Zum Startbildschirm hinzufügen"
3. App shortcut added to home screen
4. Network connection is still required for chat responses

---

### Method 3: Docker + Termux (Advanced)

```bash
pkg install docker
docker pull node:18-alpine
# ... Docker commands
```

---

## ☁️ Best Option for Deployment

### **Railway.app** (Possible hosting path)

**Setup:**

1. **Create Railway account** at railway.app (sign in with GitHub)

2. **Create new project**
   - Click "+ New Project"
   - "Deploy from GitHub repo"
   - Select "KinGKrAss/Lion"

3. **Set environment variables**
   - Click project → Variables
   - Add:
     - `GEMINI_API_KEY`: your_key
     - `NODE_ENV`: production

4. **Deploy automatically**
   - Railway deploys on each GitHub push

5. **Get live URL**
   - Open from Railway dashboard
   - Share URL with anyone
   - Works from Android browser

---

## 📲 Mobile Browser Setup

### Chrome on Android

1. **Navigate to deployed URL**
   ```
   https://lingolion-production.railway.app
   ```

2. **Add to Home Screen**
   - Tap ⋮ (menu) → "Zum Startbildschirm hinzufügen"
   - App appears like a browser-hosted shortcut
   - Keep network available for live responses

3. **Current limitation**
   - No offline cache
   - No push notifications configured in this repository

---

## 🔧 Troubleshooting on Android

### Termux Issues

**Storage Permission**
```bash
# If needed, allow storage access
termux-setup-storage
```

**Can't access localhost?**
```bash
# Check Termux network access
ifconfig  # See your IP address
# Then use: http://[your-ip]:3000 from Chrome
```

**npm install too slow**
- Use mobile hotspot for faster downloads
- Install at home on WiFi if possible

### Browser Issues

**App not loading?**
- Clear Chrome cache: Settings → Apps → Chrome → Storage → Clear cache
- Check internet connection
- Try incognito mode

**Slow performance?**
- Close other apps
- Restart phone
- Use WiFi instead of mobile data

---

## 📊 Performance Tips

### For Termux (Android)

1. **Close other apps**
   - Free up RAM for Node.js
   - Better response times

2. **Use WiFi**
   - Faster network speed
   - Stable connection

3. **Don't lock screen**
   - Android may kill Termux
   - Keep screen on or use Lock Screen

### For Cloud Deployment

1. **Use CDN**
   - Railway has built-in CDN
   - Fast globally

2. **Scale up if needed**
   - Add more resources
   - Better performance

---

## 🚀 Recommended Setup

### **For Learning & Testing**
→ Use **Termux on Android**
- Free
- Learning tool
- Direct control

### **For Sharing & Production**
→ Use **Railway.app**
- Browser-based access
- Keep backend environment variables on the server side

---

## 🛠️ Smallest sensible native integration path

If you want a real Android deliverable later without rewriting the app:

1. Add a Web App Manifest and production icons
2. Add a minimal Service Worker for static asset caching
3. Verify all API calls still route to the backend and that no secrets move into `src/`
4. Wrap the existing Vite build in **Trusted Web Activity** or **Capacitor**
5. Add Android-specific signing/build steps outside this repository only when that wrapper exists
- Easy to share
- Free tier sufficient

---

## 📋 Quick Checklist

- [ ] Clone repository
- [ ] Install Node.js (Termux or local)
- [ ] Create .env.local with API key
- [ ] Run `npm install`
- [ ] Start with `npm run dev`
- [ ] Test on Android browser
- [ ] Deploy to Railway (optional)
- [ ] Share live URL with others

---

## 🎓 Learning Resources

- **Termux Wiki**: [Termux Wiki](https://wiki.termux.com)
- **Node.js Docs**: [nodejs.org](https://nodejs.org)
- **Railway Docs**: [railway.app/docs](https://docs.railway.app)
- **React Guide**: [react.dev](https://react.dev)

---

**Questions?** Check GitHub Issues or contact admin@kingkrass.com
