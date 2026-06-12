#!/bin/bash
# Install & Run LingoLion on Termux (Android)
# Copy this entire script and paste in Termux

pkg update && pkg upgrade -y
pkg install nodejs git nano curl -y

git clone https://github.com/KinGKrAss/Lion.git
cd Lion

cp .env.example .env.local

echo "Edit .env.local with your API key:"
nano .env.local

npm install

echo "Starting LingoLion..."
echo "Open browser: http://localhost:3000"

npm run dev
