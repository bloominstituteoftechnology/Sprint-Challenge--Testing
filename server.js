// Imports
const express = require('express');
const middlewareConfig = require('./middleware/middlewareConfig.js');

// Initializes the server
const server = express();

// Configures the middleware
middlewareConfig(server);

const games = [];

// Endpoints

// Sanity check
server.get('/', (req, res) => {
  res.json({ message: 'API running' });
});

server.get('/games', (req, res) => {
  if (games.length >= 1) {
    return res.status(200).send(games);
  } else {
    return res.status(200).send([]);
  }
});

server.post('/games', (req, res) => {
  const game = req.body;

  if (!game.title || !game.genre) {
    return res.status(422).json({ message: 'Missing title or genre' });
  }

  games.push(game);
  res.status(201).send(games);
});
// Server export
module.exports = server;
