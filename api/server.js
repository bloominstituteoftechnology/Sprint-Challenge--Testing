const express = require('express');

const helpers = require('../data/helpers');

const server = require('express');

server.use(express.json());

server.get('/games', async(req, res) => {
    const games = await helpers.getAll();
    res.status(200).json(games);
});

server.post('/games', async(req, res) => {
    const newGame = req.body;
    if (!newGame.title || !newGame.genre) {
        res.status(422).json({error: 'Title and genre are required'});
    } else {
        const games = await helpers.insert(newGame);
        res.status(201).json({games});
    };
});

module.exports = (server);