const FailedRequest = require('../models/FailedRequest');
const emailService = require('./emailService');
const config = require('../config/config');
const logger = require('../utils/logger');

class MonitoringService {
    async recordFailedRequest(ip, reason, endpoint) {
        try {
            await FailedRequest.create({
                ip,
                reason,
                endpoint
            });

            const timeWindow = new Date(Date.now() - config.monitoring.timeWindowMinutes * 60 * 1000);
            const failedAttempts = await FailedRequest.countDocuments({
                ip,
                timestamp: { $gte: timeWindow }
            });

            if (failedAttempts >= config.monitoring.alertThreshold) {
                await emailService.sendAlert(ip, failedAttempts);
                logger.warn(`Alert threshold exceeded for IP: ${ip}`);
            }

            return failedAttempts;
        } catch (error) {
            logger.error('Error in monitoring service:', error);
            throw error;
        }
    }

    async getMetrics(startDate, endDate, ip = null) {
        try {
            const query = {};
            
            if (startDate && endDate) {
                query.timestamp = {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                };
            }
            
            if (ip) {
                query.ip = ip;
            }

            const metrics = await FailedRequest.find(query)
                .sort({ timestamp: -1 })
                .lean();

            const summary = {
                totalFailedRequests: metrics.length,
                uniqueIPs: new Set(metrics.map(m => m.ip)).size,
                failuresByIP: {},
                failuresByReason: {}
            };

            metrics.forEach(metric => {
                summary.failuresByIP[metric.ip] = (summary.failuresByIP[metric.ip] || 0) + 1;
                summary.failuresByReason[metric.reason] = (summary.failuresByReason[metric.reason] || 0) + 1;
            });

            return { metrics, summary };
        } catch (error) {
            logger.error('Error fetching metrics:', error);
            throw error;
        }
    }
}

module.exports = new MonitoringService(); 