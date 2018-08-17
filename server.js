const express = require('express');

const server = express();

server.use(express.json());

let games = [];

server.get('/', (req, res) => {
    res.status(200).json({ success: true, data: { api: 'running' } });
});
server.get('/games', (req, res) => {
    res.status(200).json(games);
});
// server.get('/games/:id', (req, res) => {
//     const { id } = req.params;
//     const { title, genre, releaseYear } = req.body;

//     res.status(200).json(req.body);
// });

server.post('/games', (req, res) => {
    const { title, genre, releaseYear } = req.body;
    if (!title || !genre) return res.status(422).json({ error: 'Please, provide both a title and genre.' })
    games.push({ title, genre, releaseYear })
    res.status(201).json({ title: title, genre: genre, releaseYear: releaseYear })

});

module.exports = server;