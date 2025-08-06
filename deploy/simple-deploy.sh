#!/bin/bash

# Simple deployment script for PLP Backend
set -e

echo "🚀 Starting PLP Backend deployment to server..."

# Configuration
SERVER_HOST="157.10.73.52"
SERVER_USER="ubuntu"
PROJECT_NAME="plp-phoudy"
REMOTE_PATH="/home/ubuntu/${PROJECT_NAME}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env.prod exists
if [ ! -f ".env.prod" ]; then
    log_error ".env.prod file not found!"
    log_info "Please make sure .env.prod exists with production environment variables"
    exit 1
fi

# Build the project locally first
log_info "Building project locally..."
npm install
npm run build

# Create deployment package
log_info "Creating deployment package..."
tar -czf deploy-package.tar.gz \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=dist \
    package.json \
    package-lock.json \
    nest-cli.json \
    tsconfig*.json \
    src/ \
    .env.prod \
    Dockerfile \
    deploy/

log_info "Uploading project to server..."
scp deploy-package.tar.gz ${SERVER_USER}@${SERVER_HOST}:/home/ubuntu/

log_info "Deploying on server..."
ssh ${SERVER_USER}@${SERVER_HOST} << 'ENDSSH'
    set -e
    
    echo "📦 Extracting project files..."
    rm -rf plp-phoudy
    mkdir -p plp-phoudy
    cd plp-phoudy
    tar -xzf ../deploy-package.tar.gz
    
    echo "🔧 Installing dependencies..."
    npm install --production
    
    echo "🏗️ Building project..."
    npm run build
    
    echo "🐳 Setting up Docker environment..."
    # Install Docker and Docker Compose if not already installed
    if ! command -v docker &> /dev/null; then
        echo "Installing Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        sudo usermod -aG docker ubuntu
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        echo "Installing Docker Compose..."
        sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
    fi
    
    echo "🚀 Starting application with Docker..."
    # Stop any existing containers
    docker-compose -f deploy/docker-compose.prod.yml --env-file .env.prod down || true
    
    # Start new containers
    docker-compose -f deploy/docker-compose.prod.yml --env-file .env.prod up -d --build
    
    echo "🎉 Deployment completed!"
    echo "📊 Container status:"
    docker-compose -f deploy/docker-compose.prod.yml ps
    
    echo "🌐 Backend should be available at:"
    echo "   - http://157.10.73.52:8080/api/v1"
    echo "   - http://157.10.73.52:8080/api/v1/docs (Swagger documentation)"
ENDSSH

# Cleanup local deployment package
rm -f deploy-package.tar.gz

log_info "🎉 Deployment script completed!"
log_info "🌐 Your backend should be available at:"
log_info "   - http://157.10.73.52:8080/api/v1"
log_info "   - http://157.10.73.52:8080/api/v1/docs"

# Test the deployment
log_info "🔍 Testing deployment..."
sleep 10
if curl -f http://157.10.73.52:8080/api/v1/health > /dev/null 2>&1; then
    log_info "✅ Backend is healthy and responding!"
else
    log_warn "⚠️  Backend might still be starting up. Check manually: http://157.10.73.52:8080/api/v1"
fi