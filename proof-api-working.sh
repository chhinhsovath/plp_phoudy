#!/usr/bin/expect -f

set timeout 60
set server "157.10.73.52"
set user "ubuntu"
set password "en_&xdX#!N(^OqCQzc3RE0B)m6ogU!"

puts "🔍 PROVING API IS WORKING..."

spawn ssh $user@$server
expect {
    "password:" { send "$password\r" }
    "Password:" { send "$password\r" }
    "(yes/no)?" { send "yes\r"; exp_continue }
}

expect "$ "

# 1. Check if process is running
send "echo '=== 1. CHECKING PROCESS ==='\r"
expect "$ "
send "ps aux | grep 'node.*dist/main' | grep -v grep\r"
expect "$ "

# 2. Test health endpoint from server
send "echo '=== 2. TESTING HEALTH ENDPOINT ==='\r"
expect "$ "
send "curl -s http://localhost:8085/api/v1/health | python3 -m json.tool\r"
expect "$ "

# 3. Test base endpoint
send "echo '=== 3. TESTING BASE ENDPOINT ==='\r"
expect "$ "
send "curl -s http://localhost:8085/api/v1/\r"
expect "$ "

# 4. Check available endpoints
send "echo '=== 4. TESTING SWAGGER DOCS ==='\r"
expect "$ "
send "curl -s -o /dev/null -w '%{http_code}' http://localhost:8085/api/v1/docs\r"
expect "$ "

# 5. Check listening ports
send "echo '=== 5. CHECKING LISTENING PORT ==='\r"
expect "$ "
send "netstat -tln | grep 8085\r"
expect "$ "

# 6. Test a real API endpoint
send "echo '=== 6. TESTING SUBJECTS ENDPOINT ==='\r"
expect "$ "
send "curl -s http://localhost:8085/api/v1/subjects | head -20\r"
expect "$ "

# 7. Check logs showing successful requests
send "echo '=== 7. RECENT LOGS ==='\r"
expect "$ "
send "cd plp-phoudy && tail -5 app-final.log\r"
expect "$ "

puts "\n🎯 PROOF COMPLETE!"
send "exit\r"
expect eof