const express = require('express');
const server = express();
server.use(express.json());

let data = [
    {
        title: 'Pacman',
        genre: 'Arcade', 
        releaseYear: 1980, 
        id: 0
    },
    {
        title: 'Zelda',
        genre: 'Nintendo', 
        releaseYear: 1987,
        id: 1
    },
]

server.get('/games', (req, res) => {
    res.status(200).json(data);
});

server.post('/games', (req, res) => {
    const { title, genre, releaseYear } = req.body;
    if(!title || !genre) {
        res.status(422).json({ message: 'entry incomplete' });
    } else {
        games = [...data, req.body];
        res.status(201).json(games);
    }
});

server.get('/games/:id', (req, res) => {
    const { id }  = req.params.id;
    if (!id) {
        res.status(404).json({ message: 'there is no game with that id' });
    } else {
        res.status(200).json(game);
    }
});

module.exports = server;
