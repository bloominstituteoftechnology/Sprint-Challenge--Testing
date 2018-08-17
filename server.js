const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ success: true, data: { api: 'running' } });
});
server.get('/games', (req, res) => {
    res.status(200).json([]);
});

server.post('/games', (req, res) => {
    const { title, genre, releaseYear } = req.body;
    console.log('name', name)
    if (!title || !genre) return res.status(422).json({ error: 'Please, provide both a title and genre.' })
    res.status(201).json({ title: title, genre: genre, releaseYear: releaseYear })
});

module.exports = server;