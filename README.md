# Request Monitor

A system for monitoring failed POST requests and sending email alerts when suspicious activity is detected.

## Features

- Monitors and logs failed API requests
- Records IP addresses of failed attempts
- Tracks failed requests with timestamps
- Sends email alerts when threshold of failed requests is exceeded
- Validates request headers and access tokens
- MongoDB integration for data persistence
- Email notification system

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Gmail account for sending alerts (with App Password configured)

## Setup

1. Clone the repository:
```
git clone https://github.com/rajputanuj31/Request-Monitor.git
cd Request-Monitor
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN=your_access_token

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_specific_password

# Alert Configuration
ADMIN_EMAIL=admin@example.com
ALERT_THRESHOLD=5
TIME_WINDOW_MINUTES=10
```

## Environment Variables

- `PORT`: Server port number
- `MONGODB_URI`: MongoDB Atlas connection string
- `ACCESS_TOKEN`: Token for API authentication
- `SMTP_HOST`: SMTP server host
- `SMTP_PORT`: SMTP server port
- `SMTP_USER`: Gmail address
- `SMTP_PASS`: Gmail app-specific password
- `ADMIN_EMAIL`: Email address to receive alerts
- `ALERT_THRESHOLD`: Number of failed requests before triggering alert
- `TIME_WINDOW_MINUTES`: Time window for counting failed requests

## API Endpoints

### POST /api/submit
Submit data to the API. Requires:
- Header: `x-access-token` with valid access token
- Header: `content-type: application/json`

### GET /api/metrics
Get a list of failed requests (requires valid access token)

## Security Features

1. **Access Token Validation**
   - All requests must include valid access token
   - Configurable through environment variables

2. **Request Monitoring**
   - Tracks IP addresses of failed attempts
   - Records timestamp and failure reason
   - Monitors for suspicious activity patterns

3. **Alert System**
   - Sends email alerts when threshold is exceeded
   - Configurable threshold and time window
   - Includes detailed failure information

## Database Schema

Failed requests are stored with:
- IP address
- Timestamp
- Failure reason
- Endpoint accessed

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Monitoring and Alerts

The system will:
1. Monitor all incoming requests
2. Log failed attempts with IP addresses
3. Track failed requests within configured time window
4. Send email alerts when suspicious activity is detected

## Error Handling

- Invalid access tokens return 401
- Missing headers return 400
- Server errors return 500
- All errors are logged for monitoring

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details