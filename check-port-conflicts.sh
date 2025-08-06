#!/usr/bin/expect -f

set timeout 60
set server "157.10.73.52"
set user "ubuntu"
set password "en_&xdX#!N(^OqCQzc3RE0B)m6ogU!"

puts "🔍 Checking for port conflicts..."

spawn ssh $user@$server
expect {
    "password:" { send "$password\r" }
    "Password:" { send "$password\r" }
    "(yes/no)?" { send "yes\r"; exp_continue }
}

expect "$ "

# Check what's using port 8080
send "echo '=== CHECKING PORT 8080 ==='\r"
expect "$ "
send "sudo netstat -tlnp | grep :8080\r"
expect {
    "Password:" { send "$password\r"; exp_continue }
    "$ " {}
}

# Check all listening ports
send "echo '=== ALL LISTENING PORTS ==='\r"
expect "$ "
send "sudo netstat -tlnp | grep LISTEN\r"
expect "$ "

# Check running Docker containers that might use 8080
send "echo '=== DOCKER CONTAINERS ==='\r"
expect "$ "
send "docker ps 2>/dev/null | grep 8080 || echo 'No docker containers on 8080'\r"
expect "$ "

# Check processes on common ports
send "echo '=== CHECKING OTHER COMMON PORTS ==='\r"
expect "$ "
send "sudo netstat -tlnp | grep -E ':3000|:4000|:5000|:8000|:8081|:8082'\r"
expect "$ "

# Find an available port
send "echo '=== FINDING AVAILABLE PORT ==='\r"
expect "$ "
send "for port in 8081 8082 8083 3001 4001 5001; do nc -z localhost \$port 2>/dev/null || echo \"Port \$port is available\"; done\r"
expect "$ "

# Check our Node.js process
send "echo '=== OUR NODE PROCESS ==='\r"
expect "$ "
send "ps aux | grep 'node.*dist/main' | grep -v grep\r"
expect "$ "

# Check if our app crashed
send "echo '=== LATEST APP LOGS ==='\r"
expect "$ "
send "cd plp-phoudy && tail -5 app.log 2>/dev/null || echo 'No logs found'\r"
expect "$ "

puts "🔍 Port check completed!"
send "exit\r"
expect eof