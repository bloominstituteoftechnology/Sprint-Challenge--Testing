const express = require('express');
const helmet = require('helmet');

const gamesRoutes = require('./games/gamesRoutes');

const server = express();

// MIDDLEWARE
server.use(helmet());
server.use(express.json());

// ROUTES
server.use('/games', gamesRoutes);

module.exports = server;
