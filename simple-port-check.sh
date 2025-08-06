#!/usr/bin/expect -f

set timeout 60
set server "157.10.73.52"
set user "ubuntu"
set password "en_&xdX#!N(^OqCQzc3RE0B)m6ogU!"

puts "🔍 Simple port check..."

spawn ssh $user@$server
expect {
    "password:" { send "$password\r" }
    "Password:" { send "$password\r" }
    "(yes/no)?" { send "yes\r"; exp_continue }
}

expect "$ "

# Check ports without sudo first
send "echo '=== CHECKING PORTS WITHOUT SUDO ==='\r"
expect "$ "
send "netstat -tln | grep -E ':8080|:8081|:8082|:3000|:3001'\r"
expect "$ "

# Use lsof if available
send "echo '=== USING LSOF ==='\r"
expect "$ "
send "lsof -i :8080 2>/dev/null || echo 'Port 8080 check: nothing found or no permission'\r"
expect "$ "

# Use ss command (more modern)
send "echo '=== USING SS COMMAND ==='\r"
expect "$ "
send "ss -tln | grep -E ':8080|:8081|:8082'\r"
expect "$ "

# Test specific ports with nc
send "echo '=== TESTING PORTS WITH NC ==='\r"
expect "$ "
send "nc -zv localhost 8080 2>&1 | head -1\r"
expect "$ "
send "nc -zv localhost 8081 2>&1 | head -1\r"
expect "$ "
send "nc -zv localhost 8082 2>&1 | head -1\r"
expect "$ "
send "nc -zv localhost 3001 2>&1 | head -1\r"
expect "$ "

# Check our app status
send "echo '=== OUR APP STATUS ==='\r"
expect "$ "
send "cd plp-phoudy && ps aux | grep node | grep -v grep\r"
expect "$ "

# Try a different port
send "echo '=== STARTING ON PORT 8082 ==='\r"
expect "$ "
send "pkill -f 'node.*dist/main' || true\r"
expect "$ "
send "NODE_ENV=production PORT=8082 HOST=0.0.0.0 node dist/main.js > app8082.log 2>&1 &\r"
expect "$ "
send "sleep 5\r"
expect "$ "
send "curl -f http://localhost:8082/api/v1/health && echo ' - SUCCESS ON 8082!'\r"
expect "$ "

puts "🔍 Port check completed!"
send "exit\r"
expect eof