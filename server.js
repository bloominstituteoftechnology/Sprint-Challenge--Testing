const express = require('express')

const server = express();

server.use(express.json());

const db = [
    {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980
    },
    {
        title: 'Super Mario',
        gerre: 'Switch',
        releaseYear: '2018'
    }
]

server.get('/', (req, res) => {
    res.status(200).json({api: 'server is running'})
});

server.post('/games', (req, res) => {
    const game = req.body;
    if(game.title && game.genre) {
        db.push(game);
        res.status(201).json({message: 'game created'});
    } else {
        res.status(422).json({message: 'either title or genre are missing'})
    }
});

server.get('/games', (req, res) => {
    res.status(200).json(db);
});

module.exports = server;