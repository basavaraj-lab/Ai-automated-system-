#!/bin/bash
# Server startup script

cd "/Users/basavarajurk/Documents/Ai automated responce system"

echo "🚀 Starting AI Enquiry Server..."

# Kill any existing server processes
pkill -f "node server" 2>/dev/null

# Wait a moment
sleep 1

# Start the server
echo "📡 Server starting on port 5001..."
node server.js &

# Get the process ID
SERVER_PID=$!

echo "✅ Server started with PID: $SERVER_PID"
echo "🌐 Access your enquiry system at: http://localhost:5001"
echo "📋 To stop the server, run: kill $SERVER_PID"

# Wait a moment and test the server
sleep 3

echo "🧪 Testing server..."
if curl -s http://localhost:5001/api/health > /dev/null; then
    echo "✅ Server is responding correctly!"
    echo "🎉 Your enquiry system is ready to use!"
else
    echo "❌ Server test failed. Please check the logs."
fi

echo "📝 Server logs will appear below..."
wait $SERVER_PID