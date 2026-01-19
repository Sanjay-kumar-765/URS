#!/bin/bash

echo "🚀 RainShield Deployment Setup"
echo "================================"

# Backend setup
echo ""
echo "📦 Setting up Backend..."
cd backend
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created backend/.env - Please update with your credentials"
else
    echo "⚠️  backend/.env already exists"
fi
npm install
echo "✅ Backend dependencies installed"

# Frontend setup
echo ""
echo "📦 Setting up Frontend..."
cd ../frontend
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created frontend/.env - Please update with your credentials"
else
    echo "⚠️  frontend/.env already exists"
fi
npm install
echo "✅ Frontend dependencies installed"

echo ""
echo "================================"
echo "✅ Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with MongoDB URI and JWT secret"
echo "2. Update frontend/.env with API URL and Google Client ID"
echo "3. Run 'npm start' in backend folder"
echo "4. Run 'npm start' in frontend folder"
echo ""
echo "For deployment, see DEPLOYMENT_GUIDE.md"
