const express = require('express');
const server = express();

server.use(express.json());

let gamesArr = [];

server.get('/', (req, res) => {
    res.status(200).json('API Running');
});

server.get('/games', (req, res) => {
    res.status(200).json(gamesArr);
});



module.exports = server;