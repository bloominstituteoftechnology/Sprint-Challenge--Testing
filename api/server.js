const express = require('express');
const server = express();
server.use(express.json());
const games = require('../gamesArr')

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Running' });
});

server.get('/games', (req,res) => {
    const gameList = [...games];
    res.status(200).send(gameList)
})



module.exports = server;