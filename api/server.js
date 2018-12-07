const express = require('express');

const server = express();

server.use(express.json());

let games = [];

server.get('/', (req, res) => {
    res.status(200).json({server: 'is up'})
})

server.get('/games', (req, res) => {
    res.status(200).json(games);
})

server.post('/games', (req, res) => {
    if (!req.body.title || !req.body.genre) {
        res.status(422).json({error: 'title and genre must be provided'})
        return;
    }
    games.push(req.body);
    const index = games.length - 1;
    res.status(201).json({index});
})

module.exports = server;