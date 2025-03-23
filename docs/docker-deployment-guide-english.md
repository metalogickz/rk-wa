# WhatsApp Multi-Instance API Docker Deployment Guide

This guide provides detailed instructions for deploying the WhatsApp Multi-Instance API service using Docker. The application supports both MongoDB and SQLite as database providers.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Overview](#project-overview)
- [Quick Start](#quick-start)
- [Detailed Configuration](#detailed-configuration)
  - [Environment Variables](#environment-variables)
  - [Database Configuration](#database-configuration)
  - [Authentication](#authentication)
  - [Webhook Settings](#webhook-settings)
  - [Cron Jobs](#cron-jobs)
- [Docker Deployment Options](#docker-deployment-options)
  - [Using Docker Compose](#using-docker-compose)
  - [Using Docker CLI](#using-docker-cli)
- [Volume Management](#volume-management)
- [Health Checks](#health-checks)
- [Logging](#logging)
- [Scaling](#scaling)
- [Backup and Restore](#backup-and-restore)
- [Upgrading](#upgrading)
- [Troubleshooting](#troubleshooting)
- [Security Considerations](#security-considerations)
- [API Documentation](#api-documentation)

## Prerequisites

- Docker Engine 20.10.0 or later
- Docker Compose 2.0.0 or later (if using docker-compose)
- At least 2GB of free RAM
- 1GB of free disk space (more recommended for message history)
- Internet connection (required for WhatsApp connectivity)

## Project Overview

The WhatsApp Multi-Instance API service allows you to:

- Manage multiple WhatsApp instances
- Send and receive messages
- Manage contacts
- Send media files
- Set up webhooks for real-time notifications
- Track usage statistics

The service supports two database providers:
- **MongoDB**: Recommended for production deployments
- **SQLite**: Suitable for development or small deployments

## Quick Start

To quickly start the service using Docker Compose:

1. Create a new directory for the project:
   ```bash
   mkdir whatsapp-api && cd whatsapp-api
   ```

2. Create a `docker-compose.yml` file with the following content:
   ```yaml
   version: '3'

   services:
     mongodb:
       image: mongo:latest
       ports:
         - "27017:27017"
       environment:
         - MONGO_INITDB_ROOT_USERNAME=whatsapp
         - MONGO_INITDB_ROOT_PASSWORD=whatsapp-password
       volumes:
         - mongodb_data:/data/db
       restart: unless-stopped

     whatsapp-api:
       image: your-registry/whatsapp-api:latest  # Replace with your image
       # Alternatively, use build to build from the Dockerfile
       # build: .
       ports:
         - "3000:3000"
       environment:
         - PORT=3000
         - NODE_ENV=production
         - DATABASE_PROVIDER=sqlite  # or mongodb
         - DATABASE_URL=mongodb://whatsapp:whatsapp-password@mongodb:27017/whatsapp-api?authSource=admin
         - SQLITE_DATABASE_URL=file:/usr/src/app/data/whatsapp-api.db
         - JWT_SECRET=your-jwt-secret-key-here
         - JWT_EXPIRATION=24h
         - ADMIN_EMAIL=admin@example.com
         - ADMIN_PASSWORD=admin123
       volumes:
         - whatsapp_instances:/usr/src/app/instances
         - whatsapp_uploads:/usr/src/app/uploads
         - whatsapp_logs:/usr/src/app/logs
         - whatsapp_data:/usr/src/app/data
       depends_on:
         - mongodb
       restart: unless-stopped

   volumes:
     mongodb_data:
     whatsapp_instances:
     whatsapp_uploads:
     whatsapp_logs:
     whatsapp_data:
   ```

3. Run the service:
   ```bash
   docker-compose up -d
   ```

4. Access the API at `http://localhost:3000`

5. Default admin credentials:
   - Email: admin@example.com
   - Password: admin123

## Detailed Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `3000` | No |
| `NODE_ENV` | Environment (production, development) | `development` | No |
| `DATABASE_PROVIDER` | Database provider (mongodb, sqlite) | `mongodb` | No |
| `DATABASE_URL` | MongoDB connection string | - | Yes (if using MongoDB) |
| `SQLITE_DATABASE_URL` | SQLite database path | `file:./data/whatsapp-api.db` | No |
| `JWT_SECRET` | Secret key for JWT tokens | - | Yes |
| `JWT_EXPIRATION` | JWT token expiration time | `24h` | No |
| `ADMIN_EMAIL` | Admin user email | `admin@example.com` | No |
| `ADMIN_PASSWORD` | Admin user password | `admin123` | No |
| `ADMIN_FIRST_NAME` | Admin user first name | `Admin` | No |
| `ADMIN_LAST_NAME` | Admin user last name | `User` | No |
| `LOG_LEVEL` | Logging level (debug, info, warn, error) | `info` | No |
| `MAX_FILE_SIZE` | Maximum file size for uploads (bytes) | `10485760` (10MB) | No |
| `UPLOADS_DIR` | Directory for file uploads | `./uploads` | No |
| `CORS_ORIGIN` | CORS allowed origins | `*` | No |

### Database Configuration

#### MongoDB Configuration

To use MongoDB as the database provider:

```yaml
environment:
  - DATABASE_PROVIDER=mongodb
  - DATABASE_URL=mongodb://username:password@hostname:port/database?authSource=admin
```

For replica sets or clusters:

```yaml
environment:
  - DATABASE_PROVIDER=mongodb
  - DATABASE_URL=mongodb://username:password@host1:port,host2:port,host3:port/database?replicaSet=myReplicaSet&authSource=admin
```

#### SQLite Configuration

To use SQLite as the database provider:

```yaml
environment:
  - DATABASE_PROVIDER=sqlite
  - SQLITE_DATABASE_URL=file:/usr/src/app/data/whatsapp-api.db
```

### Authentication

The service uses JWT (JSON Web Tokens) for authentication. Configure the following variables:

```yaml
environment:
  - JWT_SECRET=your-strong-secret-key-here
  - JWT_EXPIRATION=24h  # Format: Xh (hours), Xm (minutes), Xd (days)
```

For the admin user:

```yaml
environment:
  - ADMIN_EMAIL=admin@example.com
  - ADMIN_PASSWORD=secure-password
  - ADMIN_FIRST_NAME=Admin
  - ADMIN_LAST_NAME=User
```

### Webhook Settings

Webhooks can be configured per WhatsApp instance through the API. The global settings include:

```yaml
environment:
  - WEBHOOK_RETRY_INTERVAL=60000  # Retry interval in milliseconds
  - WEBHOOK_MAX_RETRIES=3         # Maximum retry attempts
```

### Cron Jobs

The service uses several cron jobs for maintenance tasks:

```yaml
environment:
  - CLEANUP_CRON=0 0 * * *          # Run at midnight every day
  - SOCKET_CHECK_CRON=*/5 * * * *   # Run every 5 minutes
  - AUTH_CHECK_CRON=0 12 * * *      # Run at noon every day
  - USAGE_SAVE_CRON=*/15 * * * *    # Run every 15 minutes
  - USAGE_LIMITS_CRON=0 * * * *     # Run every hour
  - SYSTEM_METRICS_CRON=*/5 * * * * # Run every 5 minutes
```

## Docker Deployment Options

### Using Docker Compose

The recommended way to deploy the service is using Docker Compose:

1. Save the `docker-compose.yml` file with your configuration
2. Run:
   ```bash
   docker-compose up -d
   ```
3. To check logs:
   ```bash
   docker-compose logs -f whatsapp-api
   ```
4. To stop the service:
   ```bash
   docker-compose down
   ```

### Using Docker CLI

You can also run the service using Docker CLI:

```bash
# Create a network
docker network create whatsapp-network

# Run MongoDB
docker run -d \
  --name mongodb \
  --network whatsapp-network \
  -e MONGO_INITDB_ROOT_USERNAME=whatsapp \
  -e MONGO_INITDB_ROOT_PASSWORD=whatsapp-password \
  -v mongodb_data:/data/db \
  mongo:latest

# Run WhatsApp API
docker run -d \
  --name whatsapp-api \
  --network whatsapp-network \
  -p 3000:3000 \
  -e PORT=3000 \
  -e NODE_ENV=production \
  -e DATABASE_PROVIDER=mongodb \
  -e DATABASE_URL=mongodb://whatsapp:whatsapp-password@mongodb:27017/whatsapp-api?authSource=admin \
  -e JWT_SECRET=your-jwt-secret-key-here \
  -e JWT_EXPIRATION=24h \
  -e ADMIN_EMAIL=admin@example.com \
  -e ADMIN_PASSWORD=admin123 \
  -v whatsapp_instances:/usr/src/app/instances \
  -v whatsapp_uploads:/usr/src/app/uploads \
  -v whatsapp_logs:/usr/src/app/logs \
  -v whatsapp_data:/usr/src/app/data \
  your-registry/whatsapp-api:latest
```

## Volume Management

The service uses several Docker volumes for persistent data storage:

| Volume | Purpose | Notes |
|--------|---------|-------|
| `mongodb_data` | MongoDB database files | Only needed if using MongoDB |
| `whatsapp_instances` | WhatsApp session data | Contains auth files for each instance |
| `whatsapp_uploads` | Media file uploads | For sending media files |
| `whatsapp_logs` | Application logs | Useful for troubleshooting |
| `whatsapp_data` | SQLite database files | Only needed if using SQLite |

To use named volumes with Docker CLI:

```bash
docker volume create whatsapp_instances
docker volume create whatsapp_uploads
docker volume create whatsapp_logs
docker volume create whatsapp_data
```

### Backup of Volumes

To backup volumes:

```bash
# For MongoDB data
docker run --rm -v mongodb_data:/data -v $(pwd):/backup alpine tar -czf /backup/mongodb_backup.tar.gz /data

# For WhatsApp instances
docker run --rm -v whatsapp_instances:/data -v $(pwd):/backup alpine tar -czf /backup/instances_backup.tar.gz /data

# For SQLite data
docker run --rm -v whatsapp_data:/data -v $(pwd):/backup alpine tar -czf /backup/sqlite_backup.tar.gz /data
```

### Restore of Volumes

To restore volumes:

```bash
# For MongoDB data
docker run --rm -v mongodb_data:/data -v $(pwd):/backup alpine sh -c "rm -rf /data/* && tar -xzf /backup/mongodb_backup.tar.gz -C /"

# For WhatsApp instances
docker run --rm -v whatsapp_instances:/data -v $(pwd):/backup alpine sh -c "rm -rf /data/* && tar -xzf /backup/instances_backup.tar.gz -C /"

# For SQLite data
docker run --rm -v whatsapp_data:/data -v $(pwd):/backup alpine sh -c "rm -rf /data/* && tar -xzf /backup/sqlite_backup.tar.gz -C /"
```

## Health Checks

The service provides a health check endpoint at `/health`. You can configure a Docker health check:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

## Logging

The service logs to stdout/stderr and also to files in the `/usr/src/app/logs` directory:

- `combined.log` - All logs
- `error.log` - Error logs only

To view logs from Docker:

```bash
docker logs -f whatsapp-api
```

To customize logging:

```yaml
environment:
  - LOG_LEVEL=debug  # Options: debug, info, warn, error
```

## Scaling

The service can be scaled horizontally. Each instance should have its own data volumes:

```yaml
services:
  whatsapp-api-1:
    image: your-registry/whatsapp-api:latest
    volumes:
      - whatsapp_instances_1:/usr/src/app/instances
      - whatsapp_data_1:/usr/src/app/data
    # other settings...

  whatsapp-api-2:
    image: your-registry/whatsapp-api:latest
    volumes:
      - whatsapp_instances_2:/usr/src/app/instances
      - whatsapp_data_2:/usr/src/app/data
    # other settings...
```

Note that each WhatsApp instance should only be managed by one service instance to avoid conflicts.

## Backup and Restore

### Database Backup

#### MongoDB Backup

```bash
docker exec -it mongodb mongodump --username whatsapp --password whatsapp-password --authenticationDatabase admin --db whatsapp-api --out /dump
docker cp mongodb:/dump ./backup
```

#### SQLite Backup

```bash
docker exec -it whatsapp-api sh -c "sqlite3 /usr/src/app/data/whatsapp-api.db .dump > /usr/src/app/data/backup.sql"
docker cp whatsapp-api:/usr/src/app/data/backup.sql ./backup.sql
```

### Database Restore

#### MongoDB Restore

```bash
docker cp ./backup mongodb:/dump
docker exec -it mongodb mongorestore --username whatsapp --password whatsapp-password --authenticationDatabase admin /dump
```

#### SQLite Restore

```bash
docker cp ./backup.sql whatsapp-api:/usr/src/app/data/
docker exec -it whatsapp-api sh -c "cat /usr/src/app/data/backup.sql | sqlite3 /usr/src/app/data/whatsapp-api.db"
```

## Upgrading

To upgrade the service:

1. Pull the latest image:
   ```bash
   docker-compose pull whatsapp-api
   ```

2. Restart the service:
   ```bash
   docker-compose up -d whatsapp-api
   ```

For major upgrades, consider backing up your data first.

## Troubleshooting

### Container Won't Start

Check the logs:
```bash
docker logs whatsapp-api
```

Common issues:
- Database connection problems
- Permission issues with volumes
- Environment variable misconfiguration

### Database Connection Issues

For MongoDB:
- Verify MongoDB container is running: `docker ps`
- Check connection string in `DATABASE_URL`
- Ensure credentials are correct

For SQLite:
- Check if the data directory has proper permissions
- Verify `SQLITE_DATABASE_URL` is correct

### WhatsApp Connection Issues

- Ensure the container has internet access
- Check the WhatsApp instance logs: `/usr/src/app/logs/combined.log`
- Try reconnecting the instance through the API

### QR Code Not Showing

- Restart the instance via API
- Check logs for error messages
- Ensure the browser can access the API endpoint

## Security Considerations

### Admin Password

Change the default admin password immediately after first login:

```yaml
environment:
  - ADMIN_EMAIL=admin@example.com
  - ADMIN_PASSWORD=strong-unique-password
```

### JWT Secret

Use a strong, unique JWT secret:

```yaml
environment:
  - JWT_SECRET=your-very-long-and-secure-random-string
```

### MongoDB Authentication

Always use authentication for MongoDB:

```yaml
environment:
  - DATABASE_URL=mongodb://username:password@hostname:port/database?authSource=admin
```

### Network Security

- Use a reverse proxy (like Nginx or Traefik) with HTTPS
- Restrict access to the API using network rules
- Use CORS restrictions for production:
  ```yaml
  environment:
    - CORS_ORIGIN=https://your-domain.com
  ```

## API Documentation

The API endpoints are available at:

- Authentication: `/api/auth/login`
- Instance management: `/api/instances`
- WhatsApp functions: `/api/whatsapp/:instanceId/...`
- Simplified WhatsApp API: `/api/whatsapp-simple/:instanceId/...`
- Statistics: `/api/stats/...`

For detailed API documentation, refer to the API documentation or explore the interface at `/ui/instances`.

## Building Custom Docker Image

If you need to build a custom version of the image:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-organization/whatsapp-api.git
   cd whatsapp-api
   ```

2. Modify the code as needed

3. Build the Docker image:
   ```bash
   docker build -t your-registry/whatsapp-api:custom .
   ```

4. Update your `docker-compose.yml` to use the custom image:
   ```yaml
   services:
     whatsapp-api:
       image: your-registry/whatsapp-api:custom
       # other settings...
   ```

## Environment Variable Reference Table

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `3000` | No |
| `NODE_ENV` | Environment (production, development) | `development` | No |
| `DATABASE_PROVIDER` | Database provider (mongodb, sqlite) | `mongodb` | No |
| `DATABASE_URL` | MongoDB connection string | - | Yes (if using MongoDB) |
| `SQLITE_DATABASE_URL` | SQLite database path | `file:./data/whatsapp-api.db` | No |
| `JWT_SECRET` | Secret key for JWT tokens | - | Yes |
| `JWT_EXPIRATION` | JWT token expiration time | `24h` | No |
| `ADMIN_EMAIL` | Admin user email | `admin@example.com` | No |
| `ADMIN_PASSWORD` | Admin user password | `admin123` | No |
| `ADMIN_FIRST_NAME` | Admin user first name | `Admin` | No |
| `ADMIN_LAST_NAME` | Admin user last name | `User` | No |
| `LOG_LEVEL` | Logging level (debug, info, warn, error) | `info` | No |
| `MAX_FILE_SIZE` | Maximum file size for uploads (bytes) | `10485760` (10MB) | No |
| `UPLOADS_DIR` | Directory for file uploads | `./uploads` | No |
| `CORS_ORIGIN` | CORS allowed origins | `*` | No |
| `CLEANUP_CRON` | Schedule for cleanup job | `0 0 * * *` | No |
| `SOCKET_CHECK_CRON` | Schedule for socket health check | `*/5 * * * *` | No |
| `AUTH_CHECK_CRON` | Schedule for auth expiration check | `0 12 * * *` | No |
| `USAGE_SAVE_CRON` | Schedule for saving usage metrics | `*/15 * * * *` | No |
| `USAGE_LIMITS_CRON` | Schedule for checking usage limits | `0 * * * *` | No |
| `SYSTEM_METRICS_CRON` | Schedule for collecting system metrics | `*/5 * * * *` | No |
