const express = require('express');
const server = express();
const db = require('../data/dbConfig.js');

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to root' });
});

server.get('/games', (req, res) => {
  db('games')
    .then(game => res.status(200).json(game))
    .catch(err => res.status(500).json(err));
});

server.post('/games', (req, res) => {
  const game = req.body;

  if (!game.title || !game.genre) {
    res.status(422).json({ message: 'Title and genre cannot be blank' });
  }
  db('games')
    .insert(game)
    .then(id => {
      res.status(201).json({ message: `successfully added` });
    })
    .catch(err => res.send(err));
});

module.exports = server;
