const express = require('express');

const server = express();

server.use(express.json());
server.use('/games', './games');

module.exports = server;
