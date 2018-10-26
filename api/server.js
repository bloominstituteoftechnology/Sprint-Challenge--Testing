// --- Node Dependencies
const express = require('express');
const helmet = require('helmet');

// --- Instantiate Server ---
const server = express();

// --- Implement Middleware
server.use(express.json(), helmet());

/// ----- CRUD Endpoints -----
server.get('/testmebaby/149', (request, response) => {
    response.status(200).json('One More Time');
})


// --- Export Server ---
module.exports = server;