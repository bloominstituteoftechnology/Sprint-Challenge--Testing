const express = require('express');
const server = express();

const db = require('../data/dbConfig');

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'running...'})
});

server.get('/api/games', async (req, res) => {
    const games = await db('games')
    res.status(200).json(games);
});

server.post('/api/addgame', async (req, res) => {
    const game = req.body;
    if (!game.title || !game.genre) {
        res.status(422).json({ message: 'incomplete' });
    } else {
        res.status(200).json({ message: `${game.title} has been added!`})
    }
});

module.exports = server;