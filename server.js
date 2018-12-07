const express = require('express');
const server = express();
const games = require('./db');

server.use(express.json());

// test route
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.get('/games', (req, res) => {
  res.status(200).json(games);
});

server.post('/games', (req, res) => {
  const newGame = req.body;
  if (!newGame.title || !newGame.genre) {
    return res
      .status(422)
      .json({ message: 'Please make sure game has a title and genre.' });
  }
  games.forEach(game => {
    if (game.title === newGame.title) {
      return res.status(405).json({ message: 'That title already exists.' });
    }
  });
  const updatedGames = [...games, newGame];
  res.status(200).json(updatedGames);
});

module.exports = server;
