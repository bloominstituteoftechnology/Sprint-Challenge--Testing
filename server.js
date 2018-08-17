const express = require('express');

const server = express();

server.use(express.json());

// Storing information locally
let games = [
    {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980
    },
];


// GET /GAMES
server.get('/games', (req, res) => {
    res.status(200).json(games);
});

// POST /GAMES
server.post('/games', (req, res) => {
    const { title, genre, releaseYear } = req.body;
    const newGames = { title, genre, releaseYear };
    
    if(!title || !genre || !releaseYear) {
        res.status(422).json('Require: Title, Genre, Release Year');
    }
    games.push(newGames);
    res.status(201).json(games);
});

module.exports = server;
