@echo off
echo ========================================
echo   Clean Build Setup
echo ========================================
echo.

echo Clearing EAS cache...
rd /s /q "%LOCALAPPDATA%\Temp\eas-cli-nodejs" 2>nul

echo.
echo Building APK...
cd mobile
eas build -p android --profile preview --clear-cache

pause
