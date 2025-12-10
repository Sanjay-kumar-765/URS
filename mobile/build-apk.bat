@echo off
echo ========================================
echo   Building RainShield APK with EAS
echo ========================================
echo.

echo Step 1: Checking EAS CLI...
call npm list -g eas-cli >nul 2>&1
if errorlevel 1 (
    echo Installing EAS CLI...
    call npm install -g eas-cli
)

echo.
echo Step 2: Building APK...
echo This will take 10-15 minutes.
echo You'll get a download link when done!
echo.

call eas build -p android --profile preview

echo.
echo ========================================
echo   BUILD SUBMITTED!
echo ========================================
echo.
echo Download your APK from the link above.
echo Install it on your Android phone!
echo ========================================
pause
