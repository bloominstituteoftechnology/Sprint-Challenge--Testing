const express = require('express');
const db = require('./database/db');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' });
});

server.post('/games', async (req, res) => {
    try {
        const newGame = req.body;
        console.log('newGame', newGame);
        if (req.body.title && req.body.genre) {
            const insertionCount = await db('games').insert(newGame);
            res.status(201).json(insertionCount);
        } else {
            res.status(422).json({ message: 'Title and genre are both required.'});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

server.get('/games', async (req, res) => {
    try {
        const gamesArr = await db('games');
        res.status(200).json(gamesArr);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = server;