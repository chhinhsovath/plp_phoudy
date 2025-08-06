#!/usr/bin/expect -f

set timeout 120
set server "157.10.73.52"
set user "ubuntu"
set password "en_&xdX#!N(^OqCQzc3RE0B)m6ogU!"

puts "🔍 Debugging the application startup issue..."

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

# Check the error logs
send "echo '=== APPLICATION LOGS ==='\r"
expect "$ "
send "cat app.log\r"
expect "$ "

# Check if .env.prod exists and is correct
send "echo '=== CHECKING ENV FILE ==='\r"
expect "$ "
send "ls -la .env.prod\r"
expect "$ "

# Check environment variables
send "echo '=== ENV VARIABLES ==='\r"
expect "$ "
send "head -5 .env.prod\r"
expect "$ "

# Try to start the app with more verbose logging
send "echo '=== TRYING TO START WITH DEBUG ==='\r"
expect "$ "
send "NODE_ENV=production node dist/main.js\r"
expect {
    "Application is running" { 
        puts "✅ App started successfully!"
        send "\003"
    }
    "Error" { 
        puts "❌ Error detected"
        send "\003"
    }
    timeout { 
        puts "⏰ Timeout - checking what happened"
        send "\003"
    }
}

expect "$ "

# If it failed, let's check what's missing
send "echo '=== CHECKING DATABASE CONNECTION ==='\r"
expect "$ "
send "ping -c 1 157.10.73.52\r"
expect "$ "

# Install missing dependencies if needed
send "echo '=== CHECKING MISSING DEPENDENCIES ==='\r"
expect "$ "
send "node -e \"console.log('Node.js is working'); process.exit(0);\"\r"
expect "$ "

# Check package.json scripts
send "echo '=== PACKAGE.JSON SCRIPTS ==='\r"
expect "$ "
send "cat package.json | grep -A 10 scripts\r"
expect "$ "

# Try different startup method
send "echo '=== TRYING PRODUCTION START SCRIPT ==='\r"
expect "$ "
send "npm run start:prod\r"
expect {
    "Application is running" { 
        puts "✅ App started with npm script!"
        send "\003"
    }
    "Error" { 
        puts "❌ Error with npm script too"
        send "\003"
    }
    timeout { 
        puts "⏰ Timeout with npm script"
        send "\003"
    }
}

expect "$ "

puts "🎯 Debugging completed!"
send "exit\r"
expect eof