const express = require('express');
const server = express();

const Games = require('../Model/model');

server.use(express.json());

server.get('/', async (req, res) => {
    res.status(200).json({ api: "Server Running..." });
});

server.get('/games', async (req, res) => {
    const games = await Games.getAll();

    res.status(200).json(games);
});

server.post('/games', async (req, res) => {
    const game = req.body;

    if(!game.title || !game.genre || !game.releaseYear) {
        res.status(422).json({ error: "Missing Field" });
    } else {
        const newGame = await Games.insert(game);

        res.status(201).json(newGame);
    }
});

module.exports = server;