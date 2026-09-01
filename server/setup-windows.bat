@echo off
REM WECOW LTD - Windows Setup Script
REM This script helps set up PostgreSQL and the Node.js backend

echo ========================================
echo WECOW LTD - Backend Setup (Windows)
echo ========================================
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed
    echo Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js found: 
node -v

REM Check if PostgreSQL is installed
psql --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo WARNING: PostgreSQL not found
    echo Please install PostgreSQL from: https://www.postgresql.org/download/windows/
    echo During installation, remember the password you set for the 'postgres' user
    echo.
    pause
    exit /b 1
)

echo ✓ PostgreSQL found:
psql --version

echo.
echo ========================================
echo Installing backend dependencies...
echo ========================================
echo.

cd /d "%~dp0server"

if exist node_modules (
    echo Dependencies already installed
) else (
    echo Running: npm install
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo.
echo 1. Open PostgreSQL pgAdmin (search in Start Menu)
echo.
echo 2. Create the database:
echo    - Right-click on "Databases" 
echo    - Select "Create" > "Database"
echo    - Name: wecow_db
echo    - Click "Save"
echo.
echo 3. Update server\.env with your credentials:
echo    - DB_PASSWORD = password you set during PostgreSQL install
echo    - EMAIL_USER = your Gmail address
echo    - EMAIL_PASSWORD = Gmail App Password (see BACKEND_SETUP.md)
echo    - ADMIN_EMAIL = where to receive notifications
echo.
echo 4. Start the backend server:
echo    Run in terminal: npm run dev
echo.
echo 5. Test the connection:
echo    Open browser: http://localhost:5000/api/health
echo.

pause
