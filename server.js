const express = require('express');

const server = express();

server.use(express.json())

server.get('/games', (req, res) => {
    res.status(200).json([]);
})

server.post('/games', (req, res) => {
    const { title, genre, releaseYear } = req.body;
    if (!title || !genre) return res.status(422).json({error:'I need you to fill in the required fields please' });
    res.status(201).json({title, genre, releaseYear });
})

module.exports = server;