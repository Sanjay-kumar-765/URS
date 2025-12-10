@echo off
echo ========================================
echo   Fixing and Building RainShield APK
echo ========================================
echo.

echo Step 1: Installing Expo dependencies...
call npm install expo@~52.0.0

echo.
echo Step 2: Installing missing packages...
call npx expo install

echo.
echo Step 3: Building APK...
call eas build -p android --profile preview

echo.
echo ========================================
echo   BUILD COMPLETE!
echo ========================================
pause
