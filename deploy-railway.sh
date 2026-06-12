#!/bin/bash
# Quick Deploy to Railway.app
# Usage: bash deploy.sh

echo "🚀 LingoLion Railway Deployment"
echo ""

if ! command -v railway &> /dev/null; then
    echo "Installing Railway CLI..."
    npm install -g @railway/cli
fi

echo "Logging into Railway..."
railway login

echo "Creating new project..."
railway init

echo "Setting environment variables..."
echo "Enter your Gemini API Key:"
read -p "GEMINI_API_KEY: " gemini_key

railway variables set GEMINI_API_KEY="$gemini_key"
railway variables set NODE_ENV="production"

echo "Deploying..."
railway up

echo ""
echo "✅ Deployed! Get live URL:"
echo "railway open"
