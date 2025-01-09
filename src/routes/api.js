const express = require('express');
const router = express.Router();
const validateRequest = require('../middleware/requestValidator');
const monitoringService = require('../services/monitoringService');
const logger = require('../utils/logger');

router.post('/submit', validateRequest, async (req, res) => {
    try {
        res.json({ message: 'Request processed successfully' });
    } catch (error) {
        logger.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/metrics', async (req, res) => {
    try {
        const { startDate, endDate, ip } = req.query;
        const metrics = await monitoringService.getMetrics(startDate, endDate, ip);
        res.json(metrics);
    } catch (error) {
        logger.error('Error fetching metrics:', error);
        res.status(500).json({ error: 'Error fetching metrics' });
    }
});

module.exports = router; 