const monitoringService = require('../services/monitoringService');
const logger = require('../utils/logger');

const validateRequest = (req, res, next) => {
    const accessToken = req.headers['x-access-token'];
    
    const ip = req.ip || req.connection.remoteAddress;

    if (!accessToken || accessToken !== process.env.ACCESS_TOKEN) {
        logger.warn(`Invalid access token from IP: ${ip}`);
        monitoringService.recordFailedRequest(ip, 'Invalid access token', req.path);
        return res.status(401).json({ error: 'Invalid access token' });
    }

    const requiredHeaders = ['content-type'];
    const missingHeaders = requiredHeaders.filter(header => !req.headers[header]);

    if (missingHeaders.length > 0) {
        logger.warn(`Missing required headers from IP: ${ip}: ${missingHeaders.join(', ')}`);
        monitoringService.recordFailedRequest(ip, 'Missing required headers', req.path);
        return res.status(400).json({ error: 'Missing required headers', missingHeaders });
    }

    next();
};

module.exports = validateRequest; 