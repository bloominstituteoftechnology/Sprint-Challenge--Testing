const express = require('express');

const server = express();

server.use(express.json());

let games = [];

server.post('/games', (req, res) => {
    let title = req.body.title;
    let genre = req.body.genre;
    let releaseYear = req.body.releaseYear;
    if (!title || !genre) {
        return res.status(422).json({ message: 'Please include both title and genre' })
    };
    games.push(title);
    return res.status(201).json({
        id: 1,
        title: `${title}`,
        genre: `${genre}`,
        releaseYear: `${releaseYear}`
    });
});

server.get('/games', (req, res) => {
    res.status(200).json(games);
});

server.delete('/games', (req, res) => {
    games.shift();
    res.status(200).json({ message: 'list is empty now' });
});


module.exports = server;