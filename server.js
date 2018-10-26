const express = require('express');
const server = express();
server.use(express.json());

// simple GET request to test server

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Server running successfully!' });
});

module.exports = server;
