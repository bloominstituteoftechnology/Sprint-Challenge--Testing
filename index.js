const express = require('express');

const server = express();
server.use(express.json());

const games = []

server.get('/games', async (req, res) => {
    res.status(200).json(games);
})

server.post('/games', async(req, res) => {
    if (!(req.body.title && req.body.genre)) {
        return res.status(422).json({message: 'Failed to add game to database.', error: 'Missing game title and genre.'})
    }

    if (games.length>=1) {
        const filteredTitle = games.filter(game => game.title === req.body.title);
        if (filteredTitle.length>=1) {
            return res.status(405).json({message: 'Failed to add game to database.', error: 'This title already exists.'})
        } 
    }

    try {
        const game = req.body;
        games.push(game);
        res.status(201).json(games);
    } 
    catch (error) {
        res.status(500).json({message: 'Failed to add game to database.', err: error.message})
    }
})

module.exports = server;