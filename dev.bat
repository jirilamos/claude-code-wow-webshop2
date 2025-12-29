@echo off
echo Starting WOW Webshop in development mode...
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo.

start /B cmd /c "cd backend && npm run dev"
start /B cmd /c "cd frontend && npm run dev"

echo Both services are starting...
echo Press Ctrl+C to stop all services
pause
