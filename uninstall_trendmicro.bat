@echo off
:: =========================================
:: Trend Micro SCUT Silent Uninstall Script
:: Downloads SCUT.exe + SCUT.exe.config, runs uninstall
:: =========================================

setlocal

:: ========== CONFIGURATION ==========
set "SCUT_URL_EXE=https://raw.githubusercontent.com/rohanchoudhari76-bot/rohan_pac/main/SCUT.exe"
set "SCUT_URL_CFG=https://raw.githubusercontent.com/rohanchoudhari76-bot/rohan_pac/main/SCUT.exe.config"
set "SCRIPT_DIR=%~dp0"
set "SCUT_EXE=%SCRIPT_DIR%SCUT.exe"
set "SCUT_CFG=%SCRIPT_DIR%SCUT.exe.config"
:: ====================================

echo ==========================================
echo   Trend Micro SCUT Silent Uninstall
echo ==========================================

:: Check for administrative rights
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERROR] This script requires administrative privileges.
    echo Please run as Administrator.
    pause
    exit /b 1
)

:: Download SCUT.exe if not present
if exist "%SCUT_EXE%" (
    echo SCUT.exe already exists in %SCRIPT_DIR%.
) else (
    echo Downloading SCUT.exe ...
    powershell -Command "Invoke-WebRequest -Uri '%SCUT_URL_EXE%' -OutFile '%SCUT_EXE%' -UseBasicParsing"
    if not exist "%SCUT_EXE%" (
        echo [ERROR] Failed to download SCUT.exe
        pause
        exit /b 1
    )
)

:: Download SCUT.exe.config if not present
if exist "%SCUT_CFG%" (
    echo SCUT.exe.config already exists in %SCRIPT_DIR%.
) else (
    echo Downloading SCUT.exe.config ...
    powershell -Command "Invoke-WebRequest -Uri '%SCUT_URL_CFG%' -OutFile '%SCUT_CFG%' -UseBasicParsing"
    if not exist "%SCUT_CFG%" (
        echo [ERROR] Failed to download SCUT.exe.config
        pause
        exit /b 1
    )
)

:: Run SCUT silently
echo Running SCUT.exe with -noinstall...
"%SCUT_EXE%" -noinstall

:: Optional: debug mode
:: "%SCUT_EXE%" -noinstall -dbg

echo.
echo ==========================================
echo   Trend Micro uninstall completed
echo ==========================================
echo.

:: Ask user if reboot now
choice /M "Do you want to reboot now?"
if errorlevel 2 (
    echo You chose not to reboot now. Please reboot later manually.
) else (
    echo Rebooting system in 15 seconds...
    shutdown /r /t 15 /c "System will reboot to complete Trend Micro uninstallation"
)

endlocal
exit /b 0
