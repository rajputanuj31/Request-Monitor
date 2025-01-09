require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    mongodb: {
        uri: process.env.MONGODB_URI
    },
    smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    monitoring: {
        alertThreshold: parseInt(process.env.ALERT_THRESHOLD) || 5,
        timeWindowMinutes: parseInt(process.env.TIME_WINDOW_MINUTES) || 10
    },
    adminEmail: process.env.ADMIN_EMAIL
}; 