#!/usr/bin/expect -f

set timeout 60
set server "157.10.73.52"
set user "ubuntu"
set password "en_&xdX#!N(^OqCQzc3RE0B)m6ogU!"

puts "🔥 Opening firewall for port 8080..."

spawn ssh $user@$server
expect {
    "password:" { send "$password\r" }
    "Password:" { send "$password\r" }
    "(yes/no)?" { send "yes\r"; exp_continue }
}

expect "$ "

# Check if process is still running
send "ps aux | grep 'node.*dist/main' | grep -v grep\r"
expect "$ "

# Test local connection first
send "curl -f http://localhost:8080/api/v1/health && echo ' - Local API works!'\r"
expect "$ "

# Open firewall
send "sudo ufw allow 8080\r"
expect {
    "Password:" { send "$password\r"; exp_continue }
    "$ " {}
}

# Check firewall status
send "sudo ufw status | grep 8080\r"
expect "$ "

# Test external connection from server
send "curl -f http://157.10.73.52:8080/api/v1/health && echo ' - External API works!'\r"
expect "$ "

# Check what's listening on port 8080
send "netstat -tlnp | grep :8080\r"
expect "$ "

puts "🔥 Firewall configuration completed!"
send "exit\r"
expect eof