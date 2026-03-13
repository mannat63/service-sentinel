# Service Sentinel - Monitoring Dashboard

A cloud-monitoring-compatible service health dashboard with real-time log persistence.

## Architecture

This project consists of:
- **Frontend**: React + Vite TypeScript dashboard for monitoring services
- **Backend**: Node.js Express server for persistent log storage

## Running the Application

### Frontend Development Server

```bash
# Install dependencies
npm i

# Start the frontend development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Logging Server

```bash
# Navigate to server directory
cd server

# Install Express dependency (if not already installed)
npm install express

# Start the backend logging server
node server.js
```

The backend will run on `http://localhost:5000` and logs will be written to `server/logs/app.log`

**Important**: Start the backend server first before running the frontend to ensure logs are properly persisted.

## Features

- Real-time service health monitoring
- Live activity feed with log display
- Simulated service failures and recovery
- Persistent log storage (backend + file)
- Error counters and metrics
- Cloud-ready architecture for AWS CloudWatch integration

## Log Format

Logs are stored in the following format:
```
[YYYY-MM-DD HH:MM:SS] LEVEL message
```

Example:
```
[2026-03-13 18:40:01] INFO Service health check completed
[2026-03-13 18:40:05] ERROR Database service unreachable
```

## Backend API Endpoints

- `POST /log/info` - Log info level messages
- `POST /log/warning` - Log warning level messages  
- `POST /log/error` - Log error level messages

Each endpoint expects:
```json
{
  "message": "Log message content"
}
```

## AWS CloudWatch Deployment

The backend is designed to be deployed to AWS EC2 where the `logs/app.log` file can be monitored by AWS CloudWatch for centralized log management and alerting.

## Technologies Used

### Frontend
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

### Backend
- Node.js
- Express.js
- File system logging
