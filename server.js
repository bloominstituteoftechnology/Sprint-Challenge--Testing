// Imports
const express = require('express');
const middlewareConfig = require('./middleware/middlewareConfig.js');

// Initializes the server
const server = express();

// Configures the middleware
middlewareConfig(server);

// Endpoints

// Sanity check
server.get('/', (req, res) => {
  res.json({ message: 'API running' });
});

// Server export
module.exports = server;
