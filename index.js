const express = require('express');

const server = express();
server.use(express.json());

const games = []

server.get('/games', async (req, res) => {
    res.status(200).send('api running');
})

server.post('/games', async(req, res) => {
    if (!(req.body.title && req.body.genre)) {
        res.status(422).json({message: 'Failed to add game to database.', error: 'Missing game title and genre.'})
    }

    try {
        const game = req.body;
        games.push(game);
        res.status(201).json(games);
    } catch (error) {
        res.status(500).json({message: 'Failed to add game to database.', err: error.message})
    }
    
})

module.exports = server;