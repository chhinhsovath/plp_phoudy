#!/bin/bash

echo "🔍 Diagnosing and fixing server deployment..."

SERVER="157.10.73.52"
USER="ubuntu"

echo "1️⃣ Testing server connectivity..."
if ping -c 1 $SERVER > /dev/null 2>&1; then
    echo "✅ Server is reachable"
else
    echo "❌ Server is not reachable"
    exit 1
fi

echo ""
echo "2️⃣ Checking port 8080..."
if nc -zv $SERVER 8080 2>/dev/null; then
    echo "✅ Port 8080 is open - something is running"
else
    echo "❌ Port 8080 is closed - nothing running or firewall blocking"
fi

echo ""
echo "3️⃣ The issue is: No application is running on port 8080"
echo ""
echo "🚀 SOLUTION: Deploy the application now!"
echo ""

# Create deployment script that uses sshpass if available
echo "Creating deployment commands..."

cat > deploy-commands.txt << 'EOF'
# Run these commands on the server (ssh ubuntu@157.10.73.52):

# 1. Upload deployment package first (run from local machine):
# scp plp-backend-deploy.tar.gz ubuntu@157.10.73.52:/home/ubuntu/

# 2. Then run these on the server:
rm -rf plp-phoudy
mkdir -p plp-phoudy && cd plp-phoudy
tar -xzf ../plp-backend-deploy.tar.gz

# Install Node.js if needed
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install dependencies
npm install

# Build the project
npm run build

# Stop any existing Node processes
pkill -f 'node.*dist/main' || true

# Start the application
NODE_ENV=production nohup node dist/main.js > app.log 2>&1 &

# Wait a moment
sleep 5

# Check if it's running
ps aux | grep "node.*dist/main" | grep -v grep

# Test locally on server
curl http://localhost:8080/api/v1/health

# Open firewall
sudo ufw allow 8080

# Test again
curl http://localhost:8080/api/v1/health
EOF

echo "📋 Deployment commands saved to: deploy-commands.txt"
echo ""
echo "🔧 QUICK FIX:"
echo "1. Run: scp plp-backend-deploy.tar.gz ubuntu@$SERVER:/home/ubuntu/"
echo "2. Run: ssh ubuntu@$SERVER"
echo "3. Copy and paste commands from deploy-commands.txt"
echo ""
echo "📱 After deployment, test with: ./test-api.sh"