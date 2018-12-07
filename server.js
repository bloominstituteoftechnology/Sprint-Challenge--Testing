const express = require('express');
const server = express();
let games = require('./db');

server.use(express.json());

// test route
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.get('/games', (req, res) => {
  res.status(200).json(games);
});

let gameId = 1;

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

  games.push({ ...newGame, id: gameId });

  res.status(200).json(games);

  gameId++;
});

server.get('/games/:id', (req, res) => {
  const { id } = req.params;
  const game = games.find(game => game.id == id);
  if (!game) {
    return res.status(404).json({ message: 'That game does not exist.' });
  }
  res.status(200).json(game);
});

server.delete('/games/:id', (req, res) => {
  const { id } = req.params;
  const game = games.find(game => game.id == id);
  if (!game) {
    return res.status(404).json({ message: 'That game does not exist.' });
  }
  games = games.filter(g => g !== game);
  res.status(200).json({ message: 'deleted!' });
});

module.exports = server;
