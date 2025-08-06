#!/bin/bash

# Manual deployment instructions for PLP Backend
set -e

echo "🚀 Manual Deployment Instructions for PLP Backend"
echo "=================================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo -e "${GREEN}Step 1: Build the project locally${NC}"
echo "Run: npm install && npm run build"

echo ""
echo -e "${GREEN}Step 2: Create deployment package${NC}"
echo "Run the following command to create a deployment package:"
echo "tar -czf plp-backend-deploy.tar.gz \\"
echo "    --exclude=node_modules \\"
echo "    --exclude=.git \\"
echo "    --exclude=dist \\"
echo "    package.json \\"
echo "    package-lock.json \\"
echo "    nest-cli.json \\"
echo "    tsconfig*.json \\"
echo "    src/ \\"
echo "    .env.prod \\"
echo "    Dockerfile \\"
echo "    deploy/"

echo ""
echo -e "${GREEN}Step 3: Upload to server${NC}"
echo "Upload the package to your server using:"
echo -e "${BLUE}scp plp-backend-deploy.tar.gz ubuntu@157.10.73.52:/home/ubuntu/${NC}"

echo ""
echo -e "${GREEN}Step 4: Connect to server and deploy${NC}"
echo "SSH into your server:"
echo -e "${BLUE}ssh ubuntu@157.10.73.52${NC}"
echo ""
echo "Then run these commands on the server:"
echo -e "${BLUE}"
cat << 'EOF'
# Extract the project
rm -rf plp-phoudy
mkdir -p plp-phoudy
cd plp-phoudy
tar -xzf ../plp-backend-deploy.tar.gz

# Install Node.js 18+ if not already installed
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install dependencies
npm install --production

# Build the project
npm run build

# Install Docker and Docker Compose if not already installed
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker ubuntu
    newgrp docker
fi

if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Stop any existing containers
docker-compose -f deploy/docker-compose.prod.yml --env-file .env.prod down || true

# Start the application
docker-compose -f deploy/docker-compose.prod.yml --env-file .env.prod up -d --build

# Check status
docker-compose -f deploy/docker-compose.prod.yml ps

echo "🎉 Deployment completed!"
echo "🌐 Backend available at: http://157.10.73.52:8080/api/v1"
echo "📚 API docs at: http://157.10.73.52:8080/api/v1/docs"
EOF
echo -e "${NC}"

echo ""
echo -e "${GREEN}Step 5: Test the deployment${NC}"
echo "Test your deployment by visiting:"
echo "- http://157.10.73.52:8080/api/v1/health"
echo "- http://157.10.73.52:8080/api/v1/docs"

echo ""
echo -e "${YELLOW}Note: Make sure the server firewall allows traffic on port 8080${NC}"
echo "You may need to run: sudo ufw allow 8080"