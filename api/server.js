const express = require('express');
const applyGlobalMiddleware = require('../config/globalMiddleware.js');
const gameRoutes = require('../routes/gameRoutes.js');

// server
const server = express();

// middleware
applyGlobalMiddleware(server);

// routes
server.use('/games', gameRoutes);

module.exports = server;
