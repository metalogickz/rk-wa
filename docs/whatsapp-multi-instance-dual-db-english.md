# Dual Database Support (MongoDB and SQLite)

WhatsApp Multi-Instance API now supports two databases: MongoDB and SQLite. This allows you to choose the optimal solution based on your needs and resources.

## Database Comparison

| Feature | MongoDB | SQLite |
|---------|---------|--------|
| Performance with large data volumes | High | Medium |
| Resource requirements | High | Low |
| Distributed deployment | Yes | No |
| Configuration | Complex | Simple |
| Backup | Complex | Simple (single file) |
| Server load | Medium | Low |
| Horizontal scaling | Yes | No |

## Configuration

### 1. Environment Variables

To support both databases, add the following variables to your `.env` file:

```
# Database provider selection: mongodb or sqlite
DATABASE_PROVIDER=mongodb

# URL for MongoDB
DATABASE_URL="mongodb://username:password@localhost:27017/whatsapp-api?authSource=admin"

# URL for SQLite (file path)
SQLITE_DATABASE_URL="file:./data/whatsapp-api.db"
```

### 2. Database Initialization

To initialize both databases, run the following commands:

```bash
# Generate Prisma clients for both database types
npm run prisma:generate:all

# Initialize databases and create admin user
node scripts/init-databases.js
```

The `init-databases.js` script will create necessary tables/collections in both databases and create an initial admin user.

## Switching Between Databases

### Method 1: Via API

The API provides endpoints for viewing and switching the current provider:

```
GET /api/db/status - Returns the current database provider
POST /api/db/switch - Switches the provider (requires "provider": "mongodb" or "sqlite")
```

Example request to switch to SQLite:

```bash
curl -X POST http://localhost:3000/api/db/switch \
  -H "Content-Type: application/json" \
  -d '{"provider": "sqlite"}'
```

### Method 2: By Modifying .env File

You can manually change the `DATABASE_PROVIDER` value in the `.env` file, then restart the server.

### Method 3: Command Line Utility

A special utility is provided for convenient switching:

```bash
node scripts/switch-database.js
```

This utility will interactively guide you through the database switching process.

## Migrating Data Between Databases

If you already have data in one database and want to transfer it to another, you can use the migration script:

```bash
node scripts/migrate-database.js
```

The script provides an interactive interface that allows you to:
1. Choose the migration direction (MongoDB → SQLite or SQLite → MongoDB)
2. Select data types to migrate (users, instances, messages, etc.)
3. Set limits for large datasets (messages, activity logs)

## Usage Specifics

### MongoDB

- Better suited for high-load systems with many users
- Recommended for production environments with large data volumes
- Requires MongoDB server installation and configuration
- Supports native JSON data storage

### SQLite

- Ideal for demonstrations, development, and testing
- Works great on machines with limited resources
- Doesn't require additional software – entire database in a single file
- All data stored locally, simplifying backup
- Has limitations on parallel queries and larger data volumes

## Working with JSON Data

Since SQLite doesn't support native JSON storage:

1. JSON data is automatically serialized/deserialized when writing/reading
2. Some filtering operations in SQLite may work slower if they use fields inside JSON
3. The number of nested transactions in SQLite is limited

## Backup

### MongoDB

For MongoDB backup, use standard tools:

```bash
# Create backup
mongodump --uri="mongodb://username:password@localhost:27017/whatsapp-api" --out=./backup

# Restore
mongorestore --uri="mongodb://username:password@localhost:27017/whatsapp-api" ./backup
```

### SQLite

For SQLite, backup is simply copying the database file:

```bash
# Assuming the database file path is ./data/whatsapp-api.db
cp ./data/whatsapp-api.db ./backup/whatsapp-api-$(date +%Y%m%d).db
```

## Recommendations

1. **Development and Testing**: SQLite is better due to setup simplicity
2. **Production with Low Load**: SQLite may be sufficient for small installations
3. **Production with High Load**: MongoDB will provide better performance
4. **Docker Deployment**: SQLite is easier for containerization as it doesn't require a separate database service

## Troubleshooting

### SQLite Issues

- **"Database is locked" error**: Occurs with concurrent access. SQLite supports only one write process.
- **File permission problems**: Ensure the process has read/write permissions to the database file.
- **File size**: SQLite may slow down when the database file exceeds 1GB. Archive old data regularly.

### MongoDB Issues

- **Connection errors**: Check that the MongoDB server is running and accessible at the specified URL.
- **Authentication**: Ensure credentials in DATABASE_URL are correct.
- **Indexing errors**: Create indexes for better performance with large data volumes.

## Monitoring

For database operation monitoring:

- **MongoDB**: Use MongoDB Compass or MongoDB Atlas for monitoring
- **SQLite**: Use SQLite Browser for viewing and editing data

The API's `/health` endpoint includes information about the current database provider