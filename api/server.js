const express = require('express')

const server = express();

const db = require('../data/helpers/gamesDb');

server.use(express.json());

server.get('/', async (req, res) => {
    try {
        const videogames = await db.get();
        res.status(200).send(videogames);
    } catch(err) {
        res.status(500).send(err);
    }   
});

server.post('/games', async (req, res) => {
    const videogame = req.body;
    if (videogame.title && videogame.genre) {
        const ids = await db.insert(videogame)
        res.status(201).json(ids);
    } else {
        res.status(422).json({})
    }
});

module.exports = server;