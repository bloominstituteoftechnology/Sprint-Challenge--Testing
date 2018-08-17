const express = require('express');

const server = express();

server.use(express.json());

const games = [{
    title: 'Pacman',
    genre: 'Arcade',
    releaseYear: 1980
}]

server.get('/api/games', (req, res) => {
  res.status(200).json([]);
});

module.exports = server;