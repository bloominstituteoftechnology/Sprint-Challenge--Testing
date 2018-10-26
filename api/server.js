// --- Node Dependencies
const express = require('express');
const helmet = require('helmet');

// --- Instantiate Server ---
const server = express();

// --- Implement Middleware
server.use(express.json(), helmet());

/// ----- CRUD Endpoints -----



// --- Export Server ---
module.exports = server;