#!/bin/bash

# NichePilot Setup Script
# This script helps set up the development environment

echo "🚀 Setting up NichePilot..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install sidebar dependencies
echo "📦 Installing sidebar dependencies..."
cd extension/sidebar
npm install
cd ../..

# Build sidebar
echo "🔨 Building sidebar..."
cd extension/sidebar
npm run build
cd ../..

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start the backend server: cd backend && npm start"
echo "2. Load the extension in Chrome: chrome://extensions/ -> Load unpacked -> select 'extension' folder"
echo "3. Visit x.com to see the sidebar!"

