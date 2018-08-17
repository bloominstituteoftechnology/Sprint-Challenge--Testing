const express = require('express');

const server = express();
server.use(express.json());

let games = [
    {
        id: 1,
        title: 'Jigsaw Planet',
        genre: 'Puzzle'
    },
    {
        id: 2,
        title: 'Daymare',
        genre: 'Survival Horror'
    },
    {
        id: 3,
        title: 'Fortnite',
        genre: 'Action',
        releaseYear: 2017
    }
];

let gameId = 4;

server.post('/games', (req, res) => {
    const { title, genre, releaseYear } = req.body;
    const game = { id: gameId, title, genre, releaseYear };
    if (!title || !genre) return res.status(422).json({ error: 'Please fill in the required fields' });

    games.push(game);
    gameId++;

    res.status(201).json(game);
});

server.get('/games', (req, res) => {
    res.status(200).json(games);
});

module.exports = server;