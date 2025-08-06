#!/usr/bin/expect -f

set timeout 120
set server "157.10.73.52"
set user "ubuntu"
set password "en_&xdX#!N(^OqCQzc3RE0B)m6ogU!"

puts "🔧 Removing Sharp and deploying..."

spawn ssh $user@$server
expect {
    "password:" { send "$password\r" }
    "Password:" { send "$password\r" }
    "(yes/no)?" { send "yes\r"; exp_continue }
}

expect "$ "
send "cd plp-phoudy\r"
expect "$ "

# Remove Sharp completely
send "echo '=== REMOVING SHARP MODULE ==='\r"
expect "$ "
send "npm uninstall sharp\r"
expect "$ "

# Clean up node_modules
send "rm -rf node_modules/.cache\r"
expect "$ "

# Build again without Sharp
send "echo '=== BUILDING WITHOUT SHARP ==='\r"
expect "$ "
send "npm run build\r"
expect "$ "

# Start the application
send "echo '=== STARTING APPLICATION ==='\r"
expect "$ "
send "NODE_ENV=production PORT=8080 HOST=0.0.0.0 node dist/main.js &\r"
expect "$ "

# Wait for startup
send "sleep 5\r"
expect "$ "

# Test the application
send "echo '=== TESTING APPLICATION ==='\r"
expect "$ "
send "curl -f http://localhost:8080/api/v1/health\r"
expect {
    "ok" { 
        puts "🎉 SUCCESS! API is working!"
    }
    "healthy" { 
        puts "🎉 SUCCESS! API is healthy!"
    }
    "curl:" { 
        puts "❌ Still not responding"
    }
}
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

# Final test
send "curl -f http://localhost:8080/api/v1/health && echo ' - SUCCESS!'\r"
expect "$ "

puts "🎯 Deployment completed!"
send "exit\r"
expect eof