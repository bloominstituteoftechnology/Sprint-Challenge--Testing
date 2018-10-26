const express = require('express');
const server = express();

server.use(express.json());

let gamesArr = [];

server.get('/', (req, res) => {
    res.status(200).json('API Running...');
});

module.exports = server;