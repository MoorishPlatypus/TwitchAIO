const express = require('express');
const config = require('../config/config');
const logger = require('./utils/logger');

const app = express();

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'TwitchAIO Bot is running!',
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString(),
  });
});

function keepAlive() {
  app.listen(config.server.port, '0.0.0.0', () => {
    logger.info(`Keep-alive server running on port ${config.server.port}`);
  });
}

module.exports = keepAlive;