#!/usr/bin/expect -f

set timeout 60
set server "157.10.73.52"
set user "ubuntu"
set password "en_&xdX#!N(^OqCQzc3RE0B)m6ogU!"

puts "🔧 Final fix and test..."

spawn ssh $user@$server
expect {
    "password:" { send "$password\r" }
    "Password:" { send "$password\r" }
    "(yes/no)?" { send "yes\r"; exp_continue }
}

expect "$ "
send "cd plp-phoudy\r"
expect "$ "

# Check the latest logs
send "echo '=== CHECKING LATEST LOGS ==='\r"
expect "$ "
send "cat app.log\r"
expect "$ "

# Try running without nohup to see real-time errors
send "echo '=== RUNNING WITH DIRECT OUTPUT ==='\r"
expect "$ "
send "NODE_ENV=production PORT=8080 HOST=0.0.0.0 node dist/main.js\r"
expect {
    "Application is running" { 
        puts "🎉 SUCCESS! API is working!"
        send "\003"
    }
    "Error" { 
        puts "❌ Still having errors"
        send "\003"
    }
    "Cannot find module" {
        puts "❌ Missing dependencies"
        send "\003"
    }
    "database" {
        puts "❌ Database connection issue"
        send "\003"
    }
    timeout {
        puts "⏰ No clear error message"
        send "\003"
    }
}

expect "$ "

# If still failing, try simpler approach - remove problematic modules
send "echo '=== CHECKING SPECIFIC MODULES ==='\r"
expect "$ "
send "node -e \"console.log('Basic Node.js works');\"\r"
expect "$ "

send "node -e \"console.log('Testing TypeORM'); require('typeorm');\"\r"
expect "$ "

send "node -e \"console.log('Testing NestJS'); require('@nestjs/core');\"\r"
expect "$ "

puts "🔍 Diagnostic completed!"
send "exit\r"
expect eof