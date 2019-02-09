const express = require('express');
const db = require('../dbConfig');

const server = express();
server.use(express.json());

server.get('/games', (req, res) => {
  db('games').then(games => res.status(200).json(games));
});

server.post('/games', (req, res) => {
  const game = req.body;
  if (!game.title || !game.genre) {
    res.status(422).json({ error: 'title and genre are required fields' });
  } else {
    db('games')
      .insert(game)
      .then(ids => res.status(201).json(ids));
  }
});

module.exports = server;
