const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const apiRoutes = require('./routes/api');
const logger = require('./utils/logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

mongoose.connect(config.mongodb.uri)
    .then(() => {
        logger.info('Connected to MongoDB');
    })
    .catch((error) => {
        logger.error('MongoDB connection error:', error);
        process.exit(1);
    });

app.use((err, req, res, next) => {
    logger.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`);
});

module.exports = app; 