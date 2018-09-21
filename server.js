const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json('API Running...');
});

server.post('/games', (req, res) => {
    const game = req.body;
    if (!game.title || !game.genre) {
        res.status(422).json({ error: "Please provide a title and genre for the game." })
    } else
        res.status(201).json(game);
    });


module.exports = server;