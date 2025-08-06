#!/usr/bin/expect -f

set timeout 60
set server "157.10.73.52"
set user "ubuntu"
set password "en_&xdX#!N(^OqCQzc3RE0B)m6ogU!"

puts "🔧 Fixing database configuration..."

spawn ssh $user@$server
expect {
    "password:" { send "$password\r" }
    "Password:" { send "$password\r" }
    "(yes/no)?" { send "yes\r"; exp_continue }
}

expect "$ "
send "cd plp-phoudy\r"
expect "$ "

# Check how the app reads DB config
send "echo '=== CHECKING DATABASE CONFIG ==='\r"
expect "$ "
send "grep -r 'postgres' src/config/ 2>/dev/null || echo 'No postgres in config'\r"
expect "$ "

# Check .env.prod file
send "echo '=== ENV FILE CONTENTS ==='\r"
expect "$ "
send "cat .env.prod | grep DB_\r"
expect "$ "

# Check the data-source configuration
send "echo '=== DATA SOURCE CONFIG ==='\r"
expect "$ "
send "grep -A5 -B5 'username' src/data-source.ts || echo 'No data-source.ts found'\r"
expect "$ "

# Kill existing process
send "pkill -f 'node.*dist/main' || true\r"
expect "$ "

# Start with corrected DB config - using postgres user
send "echo '=== STARTING WITH POSTGRES USER ==='\r"
expect "$ "
send "NODE_ENV=production PORT=8085 HOST=0.0.0.0 DB_HOST=localhost DB_PORT=5432 DB_NAME=plp_phoudy DB_USER=postgres DB_PASSWORD=P@ssw0rd nohup node dist/main.js > app8085-fix.log 2>&1 &\r"
expect "$ "

# Wait for startup
send "sleep 8\r"
expect "$ "

# Test the API
send "curl -f http://localhost:8085/api/v1/health && echo ' - API WORKING!'\r"
expect "$ "

# Check logs
send "tail -5 app8085-fix.log\r"
expect "$ "

# If still not working, try without DB
send "echo '=== CHECKING WITHOUT DB ==='\r"
expect "$ "
send "DB_HOST='' PORT=8085 node dist/main.js 2>&1 | head -20\r"
expect {
    "Application is running" { puts "✅ App can start!" }
    "Error" { puts "❌ Still has errors" }
    timeout { puts "⏰ Timeout" }
}

puts "🔧 Fix completed!"
send "\003\r"
expect "$ "
send "exit\r"
expect eof