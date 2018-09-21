
const express = require('express');
const server = express();


server.use(express.json());

const games = [
    { title: "Pacman", genre: "Arcade"},
    { title: "Galaga", genre: "Arcade" },
    { title: "Pong", genre: "Arcade" },
  ];

server.get('/', (req, res) => {
   res.status(200).json('Testing');
});

server.get("/games", (req, res) => {
    res.status(200).json(games); 
})

server.post('/games', (req, res) => {
    const game = req.body;
    if (!game.title || !game.genre) {
        res.status(422).json({ error: "Please provide a title and genre for the game." })
    } else
    games.push( game );
    res.status(201).json( games );
    });

module.exports = server;