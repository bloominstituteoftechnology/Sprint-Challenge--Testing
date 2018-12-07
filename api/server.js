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
})

module.exports = server;