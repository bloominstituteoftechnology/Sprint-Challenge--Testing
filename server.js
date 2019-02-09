const express = require('express');

const db = [];

const server = express();

server.use(express.json());

server.get('/games', async (req, res) => {
    await
    res
        .status(200)
        .json(db);
});

server.post('/games', () => {
    const game = {
        title: req.body.title,
        genre: req.body.genre,
        releaseYear: req.body.releaseYear
    };
    if (!req.body.title || !req.body.genre) {
        res
            .status(422)
            .json({ message: 'must enter title and genre' });
    } else {
        res
            .status(200)
            .json(game);
    }
});

module.exports = server;