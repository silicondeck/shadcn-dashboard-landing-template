#!/bin/bash

# Documentation Development Server
# This script starts the VitePress development server for the Shadcn Dashboard + Landing Page Template documentation

echo "🚀 Starting ShadcnStore Documentation Server..."
echo ""

# Check if we're in the docs directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: This script should be run from the docs/ directory"
    echo "   Please run: cd docs && ./dev.sh"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    pnpm install
    echo ""
fi

echo "🔧 Starting VitePress development server..."
echo "📚 Documentation will be available at: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the development server
pnpm dev
