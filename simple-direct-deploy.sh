#!/bin/bash

# Simple direct deployment script
echo "🚀 Simple Deployment Guide for PLP Backend"
echo "==========================================="

# Check if package exists
if [ ! -f "plp-backend-deploy.tar.gz" ]; then
    echo "❌ Deployment package not found. Creating it now..."
    tar -czf plp-backend-deploy.tar.gz --exclude=node_modules --exclude=.git --exclude=dist package.json package-lock.json nest-cli.json tsconfig*.json src/ .env.prod Dockerfile deploy/
    echo "✅ Package created: plp-backend-deploy.tar.gz"
fi

echo ""
echo "📋 Manual Steps to Deploy:"
echo ""
echo "1️⃣ Upload the package to your server:"
echo "   scp plp-backend-deploy.tar.gz ubuntu@157.10.73.52:/home/ubuntu/"
echo ""
echo "2️⃣ Connect to your server:"
echo "   ssh ubuntu@157.10.73.52"
echo ""
echo "3️⃣ Run these commands on the server:"

cat << 'EOF'

# Extract and setup
rm -rf plp-phoudy
mkdir -p plp-phoudy && cd plp-phoudy
tar -xzf ../plp-backend-deploy.tar.gz

# Install Node.js 18+ (if not installed)
node --version || (curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs)

# Install dependencies and build
npm install
npm run build

# Stop any existing process
pkill -f 'node.*dist/main' || true

# Start the application
nohup npm run start:prod > app.log 2>&1 &

# Wait and check
sleep 5
curl http://localhost:8080/api/v1/health

# Open firewall (if needed)
sudo ufw allow 8080

# Check process is running
ps aux | grep "node.*dist/main"

EOF

echo ""
echo "4️⃣ Test your API:"
echo "   http://157.10.73.52:8080/api/v1/health"
echo "   http://157.10.73.52:8080/api/v1/docs"
echo ""
echo "🔧 Troubleshooting:"
echo "   - Check logs: tail -f ~/plp-phoudy/app.log"
echo "   - Check if running: ps aux | grep node"
echo "   - Restart: cd ~/plp-phoudy && npm run start:prod"