const express = require('express');
const server = express();

server.use(express.json());

// Endpoints go here

module.exports = server;