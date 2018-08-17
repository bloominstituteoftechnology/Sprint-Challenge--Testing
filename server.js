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

    for (let i = 0; i < games.length; i++) {
        if (games[i].title.toLowerCase() === title.toLowerCase()) return res.status(405).json({ error: 'Game with this title already exists' });
    }

    games.push(game);
    gameId++;

    res.status(201).json(game);
});

server.get('/games', (req, res) => {
    res.status(200).json(games);
});

server.get('/games/:id', (req, res) => {
    const { id } = req.params;
    const game = games.find(game => game.id == id);
    if (!game) return res.status(404).json({ error: 'Game with the ID provided does not exist!' });
    res.status(200).json(game);
});

server.delete('/games/:id', (req, res) => {
    const { id } = req.params;
    const foundGame = games.find(game => game.id == id);
    if (!foundGame) return res.status(404).json({ error: 'Game with the ID provided does not exist!' });
    games = games.filter(game => game.id !== id);
    res.status(200).json({ removed: id });
})

module.exports = server;