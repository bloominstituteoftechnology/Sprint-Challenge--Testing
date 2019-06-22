const express = require('express');
const server = express();

const gamesRouter = require('../games/gamesRouter');

server.use(express.json());
server.use('/games', gamesRouter);

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Server Fired Up' })
})

module.exports = server;