const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const games = require('../data/db.js');
const server = express();


server.use(helmet());
server.use(express());
server.use(cors());

server.get('/', (req, res) => {
    res.status(200).json({ message: "Api up!"})
})

server.get('/api/games', (req, res) => {
    res.status(200).json(games);
})

server.post('/api/games', (req, res) => {
    if(!req.body.title) {
        return res.status(422).json({ message: 'missing game title'})
    }

    const game = {
        title: req.body.title,
        // genre: req.body.genre,
    }

    games.push(game);
    return res.status(201).json({ message: 'added game to database'})
})

module.exports = server;