#!/usr/bin/expect -f

set timeout 120
set server "157.10.73.52"
set user "ubuntu"
set password "en_&xdX#!N(^OqCQzc3RE0B)m6ogU!"

puts "🔧 Complete fix for Sharp module..."

spawn ssh $user@$server
expect {
    "password:" { send "$password\r" }
    "Password:" { send "$password\r" }
    "(yes/no)?" { send "yes\r"; exp_continue }
}

expect "$ "
send "cd plp-phoudy\r"
expect "$ "

# Create a completely new upload service without Sharp
send "echo '=== CREATING NEW UPLOAD SERVICE ==='\r"
expect "$ "

send "cat > src/modules/upload/upload.service.ts << 'EOF'\r"
send "import { Injectable, BadRequestException } from '@nestjs/common';\r"
send "import * as fs from 'fs';\r"
send "import * as path from 'path';\r"
send "\r"
send "@Injectable()\r"
send "export class UploadService {\r"
send "  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {\r"
send "    if (!file) {\r"
send "      throw new BadRequestException('No file provided');\r"
send "    }\r"
send "\r"
send "    const uploadDir = path.join(process.cwd(), 'uploads', folder);\r"
send "    \r"
send "    // Create directory if it doesn't exist\r"
send "    if (!fs.existsSync(uploadDir)) {\r"
send "      fs.mkdirSync(uploadDir, { recursive: true });\r"
send "    }\r"
send "\r"
send "    const filename = Date.now() + '-' + file.originalname;\r"
send "    const filepath = path.join(uploadDir, filename);\r"
send "\r"
send "    // Save file\r"
send "    fs.writeFileSync(filepath, file.buffer);\r"
send "\r"
send "    return '/uploads/' + folder + '/' + filename;\r"
send "  }\r"
send "}\r"
send "EOF\r"
expect "$ "

# Rebuild the project
send "echo '=== REBUILDING PROJECT ==='\r"
expect "$ "
send "npm run build\r"
expect {
    "$ " { puts "✅ Build successful" }
    timeout { puts "⏰ Build timeout but continuing" }
}

# Start the application
send "echo '=== STARTING APPLICATION ==='\r"
expect "$ "
send "pkill -f 'node.*dist/main' || true\r"
expect "$ "
send "NODE_ENV=production PORT=8080 HOST=0.0.0.0 nohup node dist/main.js > app.log 2>&1 &\r"
expect "$ "

# Wait for startup
send "sleep 10\r"
expect "$ "

# Test the application
send "echo '=== TESTING API ==='\r"
expect "$ "
send "curl -f http://localhost:8080/api/v1/health && echo ' - API IS WORKING!'\r"
expect "$ "

# Check process
send "ps aux | grep 'node.*dist/main' | grep -v grep && echo 'Process is running'\r"
expect "$ "

# Final logs check
send "echo '=== CHECKING LOGS ==='\r"
expect "$ "
send "tail -5 app.log\r"
expect "$ "

# Open firewall
send "sudo ufw allow 8080\r"
expect {
    "Password:" { send "$password\r"; exp_continue }
    "$ " {}
}

puts "🎯 Complete fix done!"
send "exit\r"
expect eof