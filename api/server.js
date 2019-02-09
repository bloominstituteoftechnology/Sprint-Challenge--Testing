const express = require('express');

const server = express();
server.use(express.json());

server.get('/games', (req, res) => {});

module.exports = server;
