const express = require('express');
const server = express();
const db = require('./Data/games_data');

const games = [
    {
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980,
    },
    {
        title: "Mega Man",
        genre: "Arcade",
        releaseYear: 1987,
    }
]

server.get('/api/games', (req, res) => {
    res.status(200).json(db)
});

server.post('/api/games', (req, res) => {
    const game = req.body
    games.push(game)
    res.status(201).json(games)
       

 })

module.exports = server;



