const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(helmet());
server.use(express.json());

// Add home route
server.get('/', (req, res) => {
  res.status(200).json({ message: 'Lets go!' });
});

module.exports = server;