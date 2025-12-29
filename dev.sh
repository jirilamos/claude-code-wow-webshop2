#!/bin/bash

echo "Starting WOW Webshop in development mode..."
echo "Backend: http://localhost:3001"
echo "Frontend: http://localhost:5173"
echo ""

# Start backend in background
cd backend && npm run dev &
BACKEND_PID=$!

# Start frontend in background
cd ../frontend && npm run dev &
FRONTEND_PID=$!

# Handle Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT

# Wait for both processes
wait
