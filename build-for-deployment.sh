#!/bin/bash

# Deployment build script
# This file is gitignored - customize it for your deployment needs

set -e

echo "🚀 Building for deployment..."

# CUSTOMIZE THESE VALUES FOR YOUR DEPLOYMENT:
BASE_URL="/templates/dashboard/shadcn-dashboard-landing-template/"
BASENAME="/templates/dashboard/shadcn-dashboard-landing-template"

# Navigate to vite-version directory
cd vite-version

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist/

# Build with deployment configuration
echo "🔨 Building with basename: $BASENAME"
echo "🔗 Base URL: $BASE_URL"

VITE_BASENAME="$BASENAME" pnpm exec vite build --base="$BASE_URL"

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Build completed successfully!"
  echo "📁 Output: $(pwd)/dist"
  echo ""
  echo "📋 Ready for deployment:"
  echo "- Upload contents of 'vite-version/dist' to your server"
  echo "- Configure server for SPA routing if needed"
  echo ""
  echo "🎉 Build ready!"
else
  echo "❌ Build failed!"
  exit 1
fi
