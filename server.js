const express = require('express');

const server = express();

server.get('/games', (req, res) => {
    res.status(200).json([]);
})

module.exports = server;