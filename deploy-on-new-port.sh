#!/usr/bin/expect -f

set timeout 90
set server "157.10.73.52"
set user "ubuntu"
set password "en_&xdX#!N(^OqCQzc3RE0B)m6ogU!"

puts "🚀 Deploying on new port 8085..."

spawn ssh $user@$server
expect {
    "password:" { send "$password\r" }
    "Password:" { send "$password\r" }
    "(yes/no)?" { send "yes\r"; exp_continue }
}

expect "$ "
send "cd plp-phoudy\r"
expect "$ "

# Check the latest logs to understand DB issue
send "echo '=== CHECKING DB ERROR ==='\r"
expect "$ "
send "tail -10 app8082.log 2>/dev/null || tail -10 app.log\r"
expect "$ "

# Kill any existing processes
send "pkill -f 'node.*dist/main' || true\r"
expect "$ "

# Start with full environment variables on port 8085
send "echo '=== STARTING ON PORT 8085 ==='\r"
expect "$ "
send "export NODE_ENV=production\r"
expect "$ "
send "export PORT=8085\r"
expect "$ "
send "export HOST=0.0.0.0\r"
expect "$ "
send "export DB_HOST=localhost\r"
expect "$ "
send "export DB_PORT=5432\r"
expect "$ "
send "export DB_NAME=plp_phoudy\r"
expect "$ "
send "export DB_USER=admin\r"
expect "$ "
send "export DB_PASSWORD=P@ssw0rd\r"
expect "$ "

# Try starting without database first (just to test if app starts)
send "nohup node dist/main.js > app8085.log 2>&1 &\r"
expect "$ "

# Wait for startup
send "sleep 8\r"
expect "$ "

# Check if it's running
send "ps aux | grep 'node.*dist/main' | grep -v grep\r"
expect "$ "

# Test the API
send "curl -f http://localhost:8085/api/v1/health && echo ' - API WORKS ON 8085!'\r"
expect "$ "

# Check logs
send "echo '=== APP LOGS ==='\r"
expect "$ "
send "tail -10 app8085.log\r"
expect "$ "

# Open firewall for new port
send "sudo ufw allow 8085\r"
expect {
    "Password:" { send "$password\r"; exp_continue }
    "$ " {}
}

puts "🎯 Deployment on port 8085 completed!"
send "exit\r"
expect eof