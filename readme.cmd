@echo off
setlocal EnableExtensions
title Fashionnova Storefront - README
cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  cls
  echo ============================================================
  echo   Fashionnova STOREFRONT - SETUP REQUIRED
  echo ============================================================
  echo.
  echo   Node.js and npm were not found on this computer.
  echo.
  echo   Install the LTS version from https://nodejs.org/ and reopen
  echo   this file. Node.js 18 or newer is recommended.
  echo.
  pause
  exit /b 1
)

:menu
cls
echo ============================================================
echo   Fashionnova STOREFRONT - QUICK START
echo   React + TypeScript + Vite + Tailwind CSS
echo ============================================================
echo.
echo   Folder: %CD%
echo   Docs:   CHAT_MEMORY.md (project context, status and next steps)
echo.
echo   [1] Install dependencies       npm install
echo   [2] Start dev server           npm run dev
echo   [3] Typecheck                  npm run typecheck
echo   [4] Production build           npm run build
echo   [5] Preview production build   npm run preview
echo   [6] Open CHAT_MEMORY.md
echo   [0] Exit
echo.
choice /c 1234560 /n /m "Select an option: "
set "OPTION=%ERRORLEVEL%"

if "%OPTION%"=="1" goto install
if "%OPTION%"=="2" goto dev
if "%OPTION%"=="3" goto typecheck
if "%OPTION%"=="4" goto build
if "%OPTION%"=="5" goto preview
if "%OPTION%"=="6" goto memory
if "%OPTION%"=="7" goto end
goto menu

:install
cls
echo Installing dependencies...
echo.
call npm install
if errorlevel 1 (
  echo.
  echo Install failed. Check your network connection and try again.
) else (
  echo.
  echo Dependencies are ready.
)
echo.
pause
goto menu

:dev
cls
echo Starting the Vite development server.
echo Open the URL shown below. Press Ctrl+C to stop the server.
echo.
call npm run dev
echo.
echo Dev server stopped.
pause
goto menu

:typecheck
cls
echo Running the TypeScript typecheck...
echo.
call npm run typecheck
if errorlevel 1 (
  echo.
  echo Typecheck failed. Review the errors above.
) else (
  echo.
  echo Typecheck passed.
)
echo.
pause
goto menu

:build
cls
echo Creating the production build in the dist folder...
echo.
call npm run build
if errorlevel 1 (
  echo.
  echo Build failed. Review the errors above.
) else (
  echo.
  echo Build complete. Output: %CD%\dist
)
echo.
pause
goto menu

:preview
cls
echo Serving the production build.
echo Open the URL shown below. Press Ctrl+C to stop the server.
echo.
call npm run preview
echo.
echo Preview server stopped.
pause
goto menu

:memory
cls
if exist "CHAT_MEMORY.md" (
  start "" notepad "CHAT_MEMORY.md"
) else (
  echo CHAT_MEMORY.md was not found in this folder.
  pause
)
goto menu

:end
endlocal
exit /b 0
