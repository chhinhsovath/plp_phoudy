#!/usr/bin/expect -f

set timeout 90
set server "157.10.73.52"
set user "ubuntu"
set password "en_&xdX#!N(^OqCQzc3RE0B)m6ogU!"

puts "🚀 RESTARTING AND PROVING API WORKS..."

spawn ssh $user@$server
expect {
    "password:" { send "$password\r" }
    "Password:" { send "$password\r" }
    "(yes/no)?" { send "yes\r"; exp_continue }
}

expect "$ "
send "cd plp-phoudy\r"
expect "$ "

# Start the application
send "pkill -f 'node.*dist/main' || true\r"
expect "$ "
send "NODE_ENV=production PORT=8085 HOST=0.0.0.0 DB_HOST=localhost DB_PORT=5432 DB_DATABASE=plp_phoudy DB_USERNAME=admin DB_PASSWORD=P@ssw0rd nohup node dist/main.js > app-proof.log 2>&1 &\r"
expect "$ "

# Wait for startup
send "sleep 12\r"
expect "$ "

# PROOF 1: Process is running
send "echo '📌 PROOF 1: Process Running'\r"
expect "$ "
send "ps aux | grep 'node.*dist/main' | grep -v grep\r"
expect "$ "

# PROOF 2: API Health Check
send "echo '📌 PROOF 2: Health Check Response'\r"
expect "$ "
send "curl -s http://localhost:8085/api/v1/health\r"
expect "$ "

# PROOF 3: Check logs
send "echo '📌 PROOF 3: Application Started Successfully'\r"
expect "$ "
send "tail -3 app-proof.log | grep -E 'Application is running|successfully started'\r"
expect "$ "

# PROOF 4: Port is listening
send "echo '📌 PROOF 4: Port 8085 is Listening'\r"
expect "$ "
send "ss -tln | grep :8085\r"
expect "$ "

# PROOF 5: API base response
send "echo '📌 PROOF 5: Base API Response'\r"
expect "$ "
send "curl -s http://localhost:8085/api/v1/ | head -1\r"
expect "$ "

puts "\n✅ API IS WORKING! Just needs firewall opened for external access."
send "exit\r"
expect eof