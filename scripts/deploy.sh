#!/bin/bash

# Deployment script using environment variables

echo "Starting deployment..."

# Set environment variables
export NODE_ENV=production
export PORT=3000

# Load environment variables from secure source
source /etc/environment
# or source .env file in production
# source .env.production

# Verify required environment variables are set
if [ -z "$DB_PASSWORD" ] || [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
    echo "Error: Required environment variables are not set"
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install --production

# Build application
echo "Building application..."
npm run build

# Run database migrations
echo "Running database migrations..."
node scripts/migrate.js

# Start the application
echo "Starting application..."
pm2 start server.js --name "appsec-api"

echo "Deployment complete!"

# Create encrypted backup using environment variables
if [ -n "$BACKUP_ENCRYPTION_KEY" ] && [ -n "$BACKUP_S3_BUCKET" ]; then
    echo "Creating encrypted backup..."
    tar -czf backup.tar.gz ./data
    openssl enc -aes-256-cbc -salt -in backup.tar.gz -out backup.tar.gz.enc -k "$BACKUP_ENCRYPTION_KEY"

    echo "Uploading to S3..."
    aws s3 cp backup.tar.gz.enc "$BACKUP_S3_BUCKET/backup-$(date +%Y%m%d).tar.gz.enc"
fi