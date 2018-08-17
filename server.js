const express = require('express');
const server = express();
const gameData = [];

server.use(express.json());

server.post('/games', (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title) {
    res.status(422).json({ error: 'You need a title.' });
  }
  if (!genre) {
    res.status(422).json({ error: 'You need a genre.' });
  }  
  const game = { title: title, genre: genre, releaseYear: releaseYear };
  gameData.push(game);
  res.status(201).json(game);
});

server.get('/games', (req, res) => {
  res.status(200).json(gameData);
});


module.exports = server;