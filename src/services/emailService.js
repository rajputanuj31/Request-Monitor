const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../utils/logger');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.smtp.host,
            port: config.smtp.port,
            secure: false,
            auth: {
                user: config.smtp.user,
                pass: config.smtp.pass
            }
        });
    }

    async sendAlert(ip, failedAttempts) {
        try {
            const mailOptions = {
                from: config.smtp.user,
                to: config.adminEmail,
                subject: `Alert: Multiple Failed Requests from IP ${ip}`,
                text: `Warning: IP address ${ip} has made ${failedAttempts} failed requests in the last ${config.monitoring.timeWindowMinutes} minutes.`,
                html: `
                    <h2>Security Alert</h2>
                    <p>Warning: IP address <strong>${ip}</strong> has made ${failedAttempts} failed requests 
                    in the last ${config.monitoring.timeWindowMinutes} minutes.</p>
                    <p>Please investigate this activity.</p>
                `
            };

            await this.transporter.sendMail(mailOptions);
            logger.info(`Alert email sent for IP: ${ip}`);
        } catch (error) {
            logger.error('Error sending email alert:', error);
            throw error;
        }
    }
}

module.exports = new EmailService(); 