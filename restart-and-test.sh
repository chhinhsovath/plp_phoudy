#!/usr/bin/expect -f

set timeout 90
set server "157.10.73.52"
set user "ubuntu"
set password "en_&xdX#!N(^OqCQzc3RE0B)m6ogU!"

puts "🚀 Restarting app and testing..."

spawn ssh $user@$server
expect {
    "password:" { send "$password\r" }
    "Password:" { send "$password\r" }
    "(yes/no)?" { send "yes\r"; exp_continue }
}

expect "$ "
send "cd plp-phoudy\r"
expect "$ "

# Check logs to see what happened
send "echo '=== CHECKING LATEST LOGS ==='\r"
expect "$ "
send "tail -10 app.log\r"
expect "$ "

# Stop any existing processes
send "pkill -f 'node.*dist/main' || true\r"
expect "$ "

# Start fresh with correct environment
send "echo '=== STARTING APPLICATION ==='\r"
expect "$ "
send "NODE_ENV=production DB_HOST=157.10.73.52 DB_PORT=5432 DB_NAME=plp_phoudy DB_USER=admin DB_PASSWORD=P@ssw0rd PORT=8080 HOST=0.0.0.0 nohup node dist/main.js > app.log 2>&1 &\r"
expect "$ "

# Wait for startup
send "sleep 8\r"
expect "$ "

# Check if running
send "ps aux | grep 'node.*dist/main' | grep -v grep\r"
expect "$ "

# Test locally
send "curl -f http://localhost:8080/api/v1/health || echo 'Local test failed'\r"
expect "$ "

# Open firewall with correct password
send "sudo ufw allow 8080\r"
expect {
    "Password:" { send "$password\r"; exp_continue }
    "$ " {}
}

# Check firewall
send "sudo ufw status numbered\r"
expect "$ "

# Final test
send "curl -f http://localhost:8080/api/v1/health && echo ' SUCCESS!'\r"
expect "$ "

puts "🎯 Restart completed!"
send "exit\r"
expect eof