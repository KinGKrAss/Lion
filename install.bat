@echo off
REM LingoLion Quick Install & Setup Script (Windows)
REM Run: install.bat

echo.
echo ╔════════════════════════════════════════╗
echo ║  🦁 LingoLion Installation Script      ║
echo ╚════════════════════════════════════════╝
echo.

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found. Install from nodejs.org
    exit /b 1
)

echo ✓ Node.js installed
echo ✓ npm installed
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
echo ✓ Dependencies installed
echo.

REM Create .env.local
if not exist ".env.local" (
    echo 🔑 Creating .env.local file...
    (
        echo VITE_API_URL=http://localhost:5000
        echo GEMINI_API_KEY=PASTE_YOUR_API_KEY_HERE
        echo PORT=5000
        echo APP_URL=http://localhost:5000
        echo SMTP_HOST=smtp.gmail.com
        echo SMTP_PORT=587
        echo SMTP_USER=your_email@gmail.com
        echo SMTP_PASS=your_app_password
        echo ADMIN_EMAIL=admin@kingkrass.com
    ) > .env.local
    echo ✓ .env.local created
    echo.
    echo ⚠️  IMPORTANT: Edit .env.local and add your Gemini API key!
    echo    Get free key at: https://aistudio.google.com
) else (
    echo ✓ .env.local already exists
)
echo.

REM Build
echo 🔨 Building application...
call npm run build
echo ✓ Build complete
echo.

echo.
echo ╔════════════════════════════════════════╗
echo ║  ✅ Installation Complete!             ║
echo ╚════════════════════════════════════════╝
echo.
echo Next steps:
echo   1. Edit .env.local with your API key
echo   2. Run: npm run dev
echo   3. Open: http://localhost:3000
echo.
echo For Android Deployment:
echo   See: ANDROID_DEPLOYMENT.md
echo.
pause
