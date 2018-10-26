const express = require('express');

const server = express();

server.use(express.json());

// DATABASE
let gamesDb = [
    {
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
    },
    {
        title: 'Rocket Knight Adventures', // required
        genre: 'Platformer', // required
        releaseYear: 1993 // not required
    },
    {
        title: 'Metal Slug', // required
        genre: 'Platformer', // required
        releaseYear: 1996 // not required
    },
    {
        title: 'Sonic R', // required
        genre: 'Racing', // required
        releaseYear: 1997 // not required
    }
    
]

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is up!' });
});

server.get('/games', (req, res) => {
    res.status(200).json({ data: gamesDb });
});

server.post('/games', (req, res) => {
    const { game } = req.body;
    gamesDb.push(game);
    res.status(201).json({ data: gamesDb });
});

module.exports = server;