
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


module.exports = server;