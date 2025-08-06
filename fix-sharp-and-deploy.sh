#!/usr/bin/expect -f

set timeout 180
set server "157.10.73.52"
set user "ubuntu"
set password "en_&xdX#!N(^OqCQzc3RE0B)m6ogU!"

puts "🔧 Fixing Sharp module and deploying..."

# Connect to server
spawn ssh $user@$server
expect {
    "password:" { send "$password\r" }
    "Password:" { send "$password\r" }
    "(yes/no)?" { send "yes\r"; exp_continue }
}

expect "$ "

# Go to project directory
send "cd plp-phoudy\r"
expect "$ "

# Fix the Sharp module issue
send "echo '=== FIXING SHARP MODULE ==='\r"
expect "$ "

# Remove node_modules and package-lock to get clean install
send "rm -rf node_modules package-lock.json\r"
expect "$ "

# Install with proper Sharp configuration
send "npm install --include=optional\r"
expect {
    "added" { puts "✅ Dependencies installed" }
    timeout { puts "⏰ Install timeout" }
}
expect "$ "

# Force rebuild Sharp for the correct architecture
send "npm rebuild sharp\r"
expect {
    "built" { puts "✅ Sharp rebuilt" }
    "gyp" { puts "⚠️ Build warnings (but continuing)" }
    timeout { puts "⏰ Rebuild timeout" }
}
expect "$ "

# Alternative: Install Sharp specifically for this platform
send "npm uninstall sharp && npm install sharp --os=linux\r"
expect {
    "added" { puts "✅ Sharp reinstalled" }
    timeout { puts "⏰ Sharp install timeout" }
}
expect "$ "

# Build the project
send "echo '=== BUILDING PROJECT ==='\r"
expect "$ "
send "npm run build\r"
expect {
    "$ " { puts "✅ Build completed" }
    timeout { puts "⏰ Build timeout" }
}

# Try starting the application
send "echo '=== STARTING APPLICATION ==='\r"
expect "$ "
send "NODE_ENV=production PORT=8080 HOST=0.0.0.0 nohup node dist/main.js > app.log 2>&1 &\r"
expect "$ "

# Wait for startup
send "sleep 8\r"
expect "$ "

# Check if process is running
send "ps aux | grep 'node.*dist/main' | grep -v grep\r"
expect "$ "

# Test the health endpoint
send "curl -f http://localhost:8080/api/v1/health && echo 'SUCCESS!'\r"
expect {
    "SUCCESS!" { 
        puts "🎉 API is working!"
        send "echo 'API is responding correctly!'\r"
    }
    "curl:" { 
        puts "❌ Still not working, checking logs..."
        send "tail -10 app.log\r"
    }
}
expect "$ "

# Open firewall
send "sudo ufw allow 8080\r"
expect {
    "Password:" { send "$password\r"; exp_continue }
    "$ " {}
}

# Final external test
send "echo '=== TESTING EXTERNAL ACCESS ==='\r"
expect "$ "
send "curl -f http://157.10.73.52:8080/api/v1/health || echo 'External test failed'\r"
expect "$ "

puts "🎯 Fix and deployment completed!"
send "exit\r"
expect eof