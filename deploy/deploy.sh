#!/bin/bash

# PLP Backend Production Deployment Script
set -e

echo "🚀 Starting PLP Backend deployment..."

# Configuration
REGISTRY="ghcr.io"
IMAGE_NAME="plp-backend"
CONTAINER_NAME="plp-backend-prod"
COMPOSE_FILE="deploy/docker-compose.prod.yml"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
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
    log_info "Please create .env.prod with required environment variables"
    exit 1
fi

# Load environment variables
export $(cat .env.prod | xargs)

# Backup database (if exists)
log_info "Creating database backup..."
if docker ps | grep -q plp-postgres-prod; then
    BACKUP_FILE="backups/backup_$(date +%Y%m%d_%H%M%S).sql"
    mkdir -p backups
    docker exec plp-postgres-prod pg_dump -U ${POSTGRES_USER} ${POSTGRES_DB} > ${BACKUP_FILE}
    log_info "Database backup created: ${BACKUP_FILE}"
fi

# Pull latest images
log_info "Pulling latest Docker images..."
docker-compose -f ${COMPOSE_FILE} pull

# Stop and remove old containers
log_info "Stopping existing containers..."
docker-compose -f ${COMPOSE_FILE} down

# Start new containers
log_info "Starting new containers..."
docker-compose -f ${COMPOSE_FILE} up -d

# Wait for services to be ready
log_info "Waiting for services to be ready..."
sleep 30

# Health check
log_info "Performing health check..."
if curl -f http://localhost:3000/api/v1/health > /dev/null 2>&1; then
    log_info "✅ Backend is healthy!"
else
    log_error "❌ Backend health check failed!"
    log_info "Check logs: docker logs ${CONTAINER_NAME}"
    exit 1
fi

# Show deployment info
log_info "📊 Deployment Status:"
docker-compose -f ${COMPOSE_FILE} ps

log_info "🎉 Backend deployment completed successfully!"
log_info "Backend URL: http://localhost:3000/api/v1"

# Cleanup old images
log_info "Cleaning up old Docker images..."
docker image prune -f