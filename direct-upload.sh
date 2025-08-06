#!/bin/bash

# Direct upload bypassing SSH config issues
echo "🚀 Direct deployment to server..."

SERVER="157.10.73.52"
USER="ubuntu"
PACKAGE="plp-backend-deploy.tar.gz"

echo "📤 Uploading package directly..."

# Use scp with explicit options to bypass config issues
scp -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" "$PACKAGE" "$USER@$SERVER:/home/ubuntu/"

if [ $? -eq 0 ]; then
    echo "✅ Package uploaded successfully!"
    echo ""
    echo "🔧 Now connecting to deploy..."
    
    # Connect and deploy
    ssh -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" "$USER@$SERVER" << 'ENDSSH'
        set -e
        echo "📦 Extracting deployment package..."
        rm -rf plp-phoudy
        mkdir -p plp-phoudy && cd plp-phoudy
        tar -xzf ../plp-backend-deploy.tar.gz
        
        echo "🔧 Checking Node.js..."
        if ! command -v node &> /dev/null; then
            echo "Installing Node.js..."
            curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
            sudo apt-get install -y nodejs
        fi
        
        echo "📦 Installing dependencies..."
        npm install
        
        echo "🏗️ Building project..."
        npm run build
        
        echo "🛑 Stopping existing processes..."
        pkill -f 'node.*dist/main' || true
        
        echo "🚀 Starting application..."
        NODE_ENV=production nohup node dist/main.js > app.log 2>&1 &
        
        echo "⏳ Waiting for startup..."
        sleep 10
        
        echo "🔍 Checking if process is running..."
        ps aux | grep "node.*dist/main" | grep -v grep || echo "Process not found"
        
        echo "🌐 Testing locally..."
        curl -f http://localhost:8080/api/v1/health || echo "Local test failed"
        
        echo "🔥 Opening firewall..."
        sudo ufw allow 8080 || echo "Firewall rule may already exist"
        
        echo "🎉 Deployment completed!"
        echo "Logs are in ~/plp-phoudy/app.log"
ENDSSH

    echo ""
    echo "✅ Deployment completed! Testing API..."
    
else
    echo "❌ Upload failed"
    exit 1
fi