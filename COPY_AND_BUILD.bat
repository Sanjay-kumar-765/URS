@echo off
echo ========================================
echo   Creating Clean Mobile Build
echo ========================================
echo.

echo Step 1: Creating clean folder...
mkdir D:\RainShield-Mobile-Only 2>nul
xcopy /E /I /Y mobile D:\RainShield-Mobile-Only

echo.
echo Step 2: Building APK...
cd D:\RainShield-Mobile-Only
eas build -p android --profile preview

echo.
echo ========================================
echo   Build Started!
echo ========================================
pause
