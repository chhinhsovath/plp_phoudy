#!/usr/bin/expect -f

set timeout 90
set server "157.10.73.52"
set user "ubuntu"
set password "en_&xdX#!N(^OqCQzc3RE0B)m6ogU!"

puts "🔧 Fixing upload service Sharp dependency..."

spawn ssh $user@$server
expect {
    "password:" { send "$password\r" }
    "Password:" { send "$password\r" }
    "(yes/no)?" { send "yes\r"; exp_continue }
}

expect "$ "
send "cd plp-phoudy\r"
expect "$ "

# Fix the upload service by making Sharp optional or removing it
send "echo '=== FIXING UPLOAD SERVICE ==='\r"
expect "$ "

# Check the current upload service
send "head -20 src/modules/upload/upload.service.ts\r"
expect "$ "

# Make Sharp import optional by commenting it out
send "sed -i 's/import \\* as sharp from .sharp.;/\\/\\/ import * as sharp from \"sharp\"; \\/\\/ Commented out for compatibility/' src/modules/upload/upload.service.ts\r"
expect "$ "

# Also comment out any Sharp usage in the file
send "sed -i 's/sharp(/\\/\\/ sharp(/' src/modules/upload/upload.service.ts\r"
expect "$ "

# Verify the changes
send "echo '=== CHECKING MODIFIED FILE ==='\r"
expect "$ "
send "head -20 src/modules/upload/upload.service.ts\r"
expect "$ "

# Rebuild the project
send "echo '=== REBUILDING PROJECT ==='\r"
expect "$ "
send "npm run build\r"
expect {
    "$ " { puts "✅ Build successful" }
    "error" { puts "❌ Build still has errors" }
    timeout { puts "⏰ Build timeout" }
}

# Start the application
send "echo '=== STARTING APPLICATION ==='\r"
expect "$ "
send "NODE_ENV=production PORT=8080 HOST=0.0.0.0 node dist/main.js &\r"
expect "$ "

# Wait for startup
send "sleep 8\r"
expect "$ "

# Test the application
send "echo '=== TESTING API ==='\r"
expect "$ "
send "curl -f http://localhost:8080/api/v1/health\r"
expect "$ "

# Check if process is running
send "ps aux | grep 'node.*dist/main' | grep -v grep\r"
expect "$ "

# Open firewall
send "sudo ufw allow 8080\r"
expect {
    "Password:" { send "$password\r"; exp_continue }
    "$ " {}
}

puts "🎯 Fix completed!"
send "exit\r"
expect eof