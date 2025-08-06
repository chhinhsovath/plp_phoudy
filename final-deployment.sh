#!/usr/bin/expect -f

set timeout 120
set server "157.10.73.52"
set user "ubuntu"
set password "en_&xdX#!N(^OqCQzc3RE0B)m6ogU!"

puts "🚀 Final deployment with correct database credentials..."

spawn ssh $user@$server
expect {
    "password:" { send "$password\r" }
    "Password:" { send "$password\r" }
    "(yes/no)?" { send "yes\r"; exp_continue }
}

expect "$ "
send "cd plp-phoudy\r"
expect "$ "

# Kill any existing processes
send "pkill -f 'node.*dist/main' || true\r"
expect "$ "

# Start with correct database credentials
send "echo '=== STARTING APPLICATION WITH CORRECT DB CREDENTIALS ==='\r"
expect "$ "
send "NODE_ENV=production PORT=8085 HOST=0.0.0.0 DB_HOST=localhost DB_PORT=5432 DB_DATABASE=plp_phoudy DB_USERNAME=admin DB_PASSWORD=P@ssw0rd nohup node dist/main.js > app-final.log 2>&1 &\r"
expect "$ "

# Wait for startup
send "sleep 10\r"
expect "$ "

# Check if running
send "ps aux | grep 'node.*dist/main' | grep -v grep\r"
expect "$ "

# Test the API
send "echo '=== TESTING API ==='\r"
expect "$ "
send "curl -f http://localhost:8085/api/v1/health\r"
expect {
    "ok" { puts "\n🎉 SUCCESS! API is working!" }
    "healthy" { puts "\n🎉 SUCCESS! API is healthy!" }
    timeout { puts "\n⏰ Timeout" }
}
expect "$ "

# Check logs
send "echo '=== APPLICATION LOGS ==='\r"
expect "$ "
send "tail -10 app-final.log\r"
expect "$ "

# Open firewall
send "sudo ufw allow 8085\r"
expect {
    "Password:" { send "$password\r"; exp_continue }
    "already exists" { puts "Port already open" }
    "$ " {}
}

# Test external access
send "echo '=== EXTERNAL TEST ==='\r"
expect "$ "
send "curl -f http://157.10.73.52:8085/api/v1/health && echo ' - External access works!'\r"
expect "$ "

puts "\n🎯 Deployment completed!"
send "exit\r"
expect eof