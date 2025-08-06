#!/usr/bin/expect -f

set timeout 30
set server "157.10.73.52"
set user "ubuntu"
set password "en_&xdX#!N(^OqCQzc3RE0B)m6ogU!"

spawn ssh $user@$server
expect {
    "password:" { send "$password\r" }
    "Password:" { send "$password\r" }
    "(yes/no)?" { send "yes\r"; exp_continue }
}

expect "$ "

# Check if any process is running on port 8080
send "sudo netstat -tlnp | grep :8080 || echo 'No process on port 8080'\r"
expect "$ "

# Check if plp-phoudy directory exists
send "ls -la plp-phoudy 2>/dev/null || echo 'plp-phoudy directory not found'\r"
expect "$ "

# Check if Node.js is installed
send "node --version 2>/dev/null || echo 'Node.js not installed'\r"
expect "$ "

# Check firewall status
send "sudo ufw status | grep 8080 || echo 'Port 8080 not in firewall rules'\r"
expect "$ "

# Check if deployment package exists
send "ls -la plp-backend-deploy.tar.gz 2>/dev/null || echo 'Deployment package not found'\r"
expect "$ "

send "exit\r"
expect eof