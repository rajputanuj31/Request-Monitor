const mongoose = require('mongoose');

const failedRequestSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true,
        index: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: true
    },
    reason: {
        type: String,
        required: true
    },
    endpoint: {
        type: String,
        required: true
    }
});

failedRequestSchema.index({ ip: 1, timestamp: 1 });

module.exports = mongoose.model('FailedRequest', failedRequestSchema); 