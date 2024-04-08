@echo off
setlocal

:: Check if live-server is globally installed
live-server --version >nul 2>&1
if %errorlevel% neq 0 (
    :: Check if live-server is locally installed
    if not exist node_modules\live-server (
        echo "live-server not found. Installing locally..."
        npm install live-server
    )
)

:: Start a local server and host the Quaver directory directly as the root directory
node_modules\.bin\live-server --open=/

endlocal
