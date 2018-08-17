const express = require('express');
const server = express();
server.use(express.json());

server.post('/games', (req, res) => {
  if (!req.body.title || !req.body.genre || !req.body.releaseYear) {
    return res.status(422).json();
  }
  return res.status(201).json(req.body);
});

server.get('/games', (req, res) => {
  return res.status(200).json([{ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 }]);
});

module.exports = server;
