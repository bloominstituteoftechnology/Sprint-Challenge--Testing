const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ success: true, data: { api: 'running' } });
});

server.post('/games', (req, res) => {
    const { title, genre, releaseYear } = req.body;
    console.log('name', name)

    res.status(200).json({ title: title, genre: genre, releaseYear: releaseYear })
});

module.exports = server;