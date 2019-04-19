const express = require('express');

const games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'up' });
});

//Get Games
server.get('/games', async (req, res) => {
  const rows = await games.getAll();

  res.status(200).json(rows);
});

//Add a Game

module.exports = server;
