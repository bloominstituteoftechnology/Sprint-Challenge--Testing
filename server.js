
const express = require('express');
const server = express();


server.use(express.json());

const games = [
    { id: "1", title: "Pacman", genre: "Arcade"},
    { id: "2", title: "Galaga", genre: "Arcade" },
    { id: "3", title: "Pong", genre: "Arcade" },
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
        res.status(201).json(game);
    });

module.exports = server;