const express = require('express');

const server = express();

server.use(express.json());

server.post('/games', (req, res) => {
    let title = req.body.title;
    let genre = req.body.genre;
    let releaseYear = req.body.releaseYear;
    if (!title || !genre) {
        return res.status(422).json({ message: 'Please include both title and genre' })
    };
    return res.status(201).json({
        id: 1,
        title: `${title}`,
        genre: `${genre}`,
        releaseYear: `${releaseYear}`
    });
})


module.exports = server;