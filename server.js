const express = require('express');

const server = express();
server.use(express.json());

let games = [];

server.post('/', (req, res) => {
    const game = req.body;
    if(!game.title || !game.genre) {
        res.status(422).json({ message: 'Please include title and genre.' });
    } else {
        games.push(game);
        res.status(201).json({ message: 'Game added.'});
    }
});

server.get('/', (req, res) => {
    res.status(200).send(games);
});

module.exports = server;