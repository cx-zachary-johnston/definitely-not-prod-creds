# AppSec Test Server

Express.js API server for testing Checkmarx pre-commit secret scanning.

## Features

- User authentication (register/login)
- JWT token-based authentication
- Role-based access control (user/admin)
- Security scanning simulation
- Configuration management
- User profile management
- Metrics endpoint

## Configuration

This project uses environment variables for all sensitive configuration. Copy `.env` to `.env.local` and populate with actual values:

```bash
cp .env .env.local
```

## Installation

```bash
npm install
```

## Running the Server

```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/profile` - Get current user profile
- `PUT /api/profile` - Update user profile
- `DELETE /api/users/:userId` - Delete user (admin only)

### Security
- `POST /api/security/scan` - Run security scan
- `GET /api/config` - Get configuration (admin only)
- `GET /api/metrics` - Get system metrics

### Utility
- `GET /health` - Health check endpoint

## Testing with Checkmarx

Once the pre-commit hooks are installed, any commit containing this code should trigger secret scanning alerts due to the hardcoded credentials.

## Sample Requests

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "role": "admin"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Run Security Scan (requires auth token)
```bash
curl -X POST http://localhost:3000/api/security/scan \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "target": "https://example.com",
    "scanType": "full"
  }'
```