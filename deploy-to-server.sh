#!/bin/bash

# Direct deployment to server - Step by step
set -e

SERVER="157.10.73.52"
USER="ubuntu"
PASSWORD="en_&xdX#!N(^OqCQzc3RE0B)m6ogU!"

echo "🚀 Starting direct deployment to server..."

# Step 1: Upload files using expect (handles password)
echo "📤 Step 1: Uploading files to server..."

# Create expect script for scp
cat > upload.exp << 'EOF'
#!/usr/bin/expect -f
set timeout 120
set server [lindex $argv 0]
set user [lindex $argv 1]
set password [lindex $argv 2]
set file [lindex $argv 3]

spawn scp $file $user@$server:/home/ubuntu/
expect {
    "password:" { send "$password\r"; exp_continue }
    "Password:" { send "$password\r"; exp_continue }
    "(yes/no)?" { send "yes\r"; exp_continue }
    eof
}
EOF

chmod +x upload.exp

# Upload the deployment package
./upload.exp $SERVER $USER "$PASSWORD" plp-backend-deploy.tar.gz

# Step 2: Deploy on server using expect
echo "🔧 Step 2: Deploying on server..."

# Create expect script for ssh deployment
cat > deploy.exp << 'EOF'
#!/usr/bin/expect -f
set timeout 300
set server [lindex $argv 0]
set user [lindex $argv 1]
set password [lindex $argv 2]

spawn ssh $user@$server
expect {
    "password:" { send "$password\r" }
    "Password:" { send "$password\r" }
    "(yes/no)?" { send "yes\r"; exp_continue }
}

expect "$ "

# Extract project
send "rm -rf plp-phoudy\r"
expect "$ "
send "mkdir -p plp-phoudy && cd plp-phoudy\r"
expect "$ "
send "tar -xzf ../plp-backend-deploy.tar.gz\r"
expect "$ "

# Install Node.js if needed
send "node --version 2>/dev/null || (curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs)\r"
expect {
    "Password:" { send "$password\r"; exp_continue }
    "$ " {}
    timeout { puts "Node.js installation timeout" }
}

# Install dependencies
send "npm install\r"
expect {
    "$ " {}
    timeout { puts "npm install timeout" }
}

# Build project
send "npm run build\r"
expect {
    "$ " {}
    timeout { puts "npm build timeout" }
}

# Start the application directly (without Docker for now)
send "pkill -f 'node.*dist/main' || true\r"
expect "$ "
send "nohup npm run start:prod > app.log 2>&1 &\r"
expect "$ "
send "sleep 5\r"
expect "$ "

# Check if app is running
send "curl -f http://localhost:8080/api/v1/health || echo 'Health check failed'\r"
expect "$ "

# Open firewall
send "sudo ufw status | grep -q '8080' || sudo ufw allow 8080\r"
expect {
    "Password:" { send "$password\r"; exp_continue }
    "$ " {}
}

send "echo 'Deployment completed!'\r"
expect "$ "
send "exit\r"
expect eof
EOF

chmod +x deploy.exp

# Run deployment
./deploy.exp $SERVER $USER "$PASSWORD"

# Cleanup
rm -f upload.exp deploy.exp

echo "✅ Deployment completed!"
echo "🌐 Your API should be available at: http://157.10.73.52:8080/api/v1"
echo "🏥 Health check: http://157.10.73.52:8080/api/v1/health"
echo "📚 API docs: http://157.10.73.52:8080/api/v1/docs"

# Test the deployment
echo "🔍 Testing deployment..."
sleep 10
if curl -f "http://157.10.73.52:8080/api/v1/health" > /dev/null 2>&1; then
    echo "✅ API is responding!"
else
    echo "⚠️ API might still be starting. Check manually."
fi