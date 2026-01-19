@echo off
echo 🚀 RainShield Deployment Setup
echo ================================

REM Backend setup
echo.
echo 📦 Setting up Backend...
cd backend
if not exist .env (
    copy .env.example .env
    echo ✅ Created backend/.env - Please update with your credentials
) else (
    echo ⚠️  backend/.env already exists
)
call npm install
echo ✅ Backend dependencies installed

REM Frontend setup
echo.
echo 📦 Setting up Frontend...
cd ..\frontend
if not exist .env (
    copy .env.example .env
    echo ✅ Created frontend/.env - Please update with your credentials
) else (
    echo ⚠️  frontend/.env already exists
)
call npm install
echo ✅ Frontend dependencies installed

cd ..
echo.
echo ================================
echo ✅ Setup Complete!
echo.
echo Next steps:
echo 1. Update backend/.env with MongoDB URI and JWT secret
echo 2. Update frontend/.env with API URL and Google Client ID
echo 3. Run 'npm start' in backend folder
echo 4. Run 'npm start' in frontend folder
echo.
echo For deployment, see DEPLOYMENT_GUIDE.md
pause
