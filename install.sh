#!/bin/bash
# LingoLion Quick Install & Setup Script
# Run: bash install.sh

set -e

echo "╔════════════════════════════════════════╗"
echo "║  🦁 LingoLion Installation Script      ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Install from nodejs.org"
    exit 1
fi

echo "✓ Node.js $(node --version)"
echo "✓ npm $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✓ Dependencies installed"
echo ""

# Create .env.local
if [ ! -f ".env.local" ]; then
    echo "🔑 Creating .env.local file..."
    cat > .env.local << 'EOF'
VITE_API_URL=http://localhost:5000
GEMINI_API_KEY=PASTE_YOUR_API_KEY_HERE
PORT=5000
APP_URL=http://localhost:5000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=admin@kingkrass.com
EOF
    echo "✓ .env.local created"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env.local and add your Gemini API key!"
    echo "   Get free key at: https://aistudio.google.com"
else
    echo "✓ .env.local already exists"
fi
echo ""

# Build
echo "🔨 Building application..."
npm run build
echo "✓ Build complete"
echo ""

echo "╔════════════════════════════════════════╗"
echo "║  ✅ Installation Complete!             ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "Next steps:"
echo "  1. Edit .env.local with your API key"
echo "  2. Run: npm run dev"
echo "  3. Open: http://localhost:3000"
echo ""
echo "For Android Deployment:"
echo "  See: ANDROID_DEPLOYMENT.md"
echo ""
