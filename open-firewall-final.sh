#!/usr/bin/expect -f

set timeout 60
set server "157.10.73.52"
set user "ubuntu"
set password "en_&xdX#!N(^OqCQzc3RE0B)m6ogU!"

puts "🔓 Opening firewall for port 8085..."

spawn ssh $user@$server
expect {
    "password:" { send "$password\r" }
    "Password:" { send "$password\r" }
    "(yes/no)?" { send "yes\r"; exp_continue }
}

expect "$ "

# Open firewall
send "echo $password | sudo -S ufw allow 8085\r"
expect "$ "

# Check firewall status
send "sudo ufw status | grep 8085\r"
expect "$ "

# Test from server itself
send "curl http://localhost:8085/api/v1/health\r"
expect "$ "

puts "🔓 Firewall opened!"
send "exit\r"
expect eof