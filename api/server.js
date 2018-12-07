const express = require('express');

const server = express();

server.use(express.json());

//sanity check endpoint

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

module.exports = server;
