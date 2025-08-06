#!/usr/bin/expect -f

set timeout 300
set server "157.10.73.52"
set user "ubuntu"
set password "en_&xdX#!N(^OqCQzc3RE0B)m6ogU!"
set package "plp-backend-deploy.tar.gz"

puts "🚀 Starting deployment with password authentication..."

# Upload the package
puts "📤 Uploading deployment package..."
spawn scp $package $user@$server:/home/ubuntu/
expect {
    "password:" { send "$password\r" }
    "Password:" { send "$password\r" }
    "(yes/no)?" { send "yes\r"; exp_continue }
}
expect eof

puts "✅ Package uploaded! Now deploying..."

# Connect and deploy
spawn ssh $user@$server
expect {
    "password:" { send "$password\r" }
    "Password:" { send "$password\r" }
    "(yes/no)?" { send "yes\r"; exp_continue }
}

expect "$ "

# Extract and setup
send "rm -rf plp-phoudy && mkdir -p plp-phoudy && cd plp-phoudy\r"
expect "$ "
send "tar -xzf ../plp-backend-deploy.tar.gz\r"
expect "$ "

# Check Node.js
send "node --version || echo 'Node.js not found'\r"
expect "$ "

# Install Node.js if needed
send "if ! command -v node &> /dev/null; then curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs; fi\r"
expect {
    "Password:" { send "$password\r"; exp_continue }
    "$ " {}
    timeout { puts "Node.js installation timeout" }
}

# Install dependencies
send "npm install\r"
expect {
    "$ " {}
    timeout { puts "npm install timeout"; send "\003" }
}

# Build project
send "npm run build\r"
expect {
    "$ " {}
    timeout { puts "npm build timeout"; send "\003" }
}

# Stop existing processes
send "pkill -f 'node.*dist/main' || true\r"
expect "$ "

# Start the application
send "NODE_ENV=production nohup node dist/main.js > app.log 2>&1 &\r"
expect "$ "

# Wait for startup
send "sleep 10\r"
expect "$ "

# Check if running
send "ps aux | grep 'node.*dist/main' | grep -v grep\r"
expect "$ "

# Test locally
send "curl -f http://localhost:8080/api/v1/health || echo 'Local health check failed'\r"
expect "$ "

# Open firewall
send "sudo ufw allow 8080\r"
expect {
    "Password:" { send "$password\r"; exp_continue }
    "$ " {}
}

# Final test
send "curl -f http://localhost:8080/api/v1/health && echo 'SUCCESS: API is working!'\r"
expect "$ "

# Check logs if needed
send "tail -n 20 app.log\r"
expect "$ "

puts "🎉 Deployment completed!"
send "exit\r"
expect eof