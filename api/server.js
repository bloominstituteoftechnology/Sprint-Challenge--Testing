const express = require('express');

const server = express ();

server.use(express.json());

server.get('/games', (req, res) => {
    const games = [
        {
            title: 'Pacman',
            genre: 'Arcade',
            releaseYear: 1980
        },
        {
            title: 'RedDead Redemption II',
            genre: 'SandBox/Rpg',
            releaseYear: 2018
        },
        {
            title: 'FortNite',
            genre: 'SandBox/Shooter',
            releaseYear: 2017
        }
    ];
    res.status(200).json(games);
})

server.post('/games', (req, res) => {
    let { title, genre, releaseYear } = req.body;
        if(!title || !genre) {
            return res.status(422).json({message: 'Error no title or genre'})
        }
    return res.status(201).json({message: `${title} has been successfully added`})
})

const port = process.env.PORT || 9002

module.exports = server;