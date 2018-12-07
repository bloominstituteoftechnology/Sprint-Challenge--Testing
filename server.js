const express = require('express');
const server = express();

server.use(express.json());

// test route
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

module.exports = server;
