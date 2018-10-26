const express = require('express');

const server = express();

server.use(express.json());

server.post('/games', () => {

});

server.get('/games', () => {

});

module.exports = server;