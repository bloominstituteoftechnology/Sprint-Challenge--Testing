const express = require('express');
const server = express();

server.use(express.json());

const games = [
  {
    title: 'Pac-man',
    genre: 'Arcade',
    releaseYear: 1980
  }
];

//sanity check
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

// GET games endpoint
server.get('/games', (req, res) => {
  res.status(200).json(games);
});

// POST game endpoint

module.exports = server;
