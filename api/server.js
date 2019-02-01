const express = require('express');

const games = require('../games/gamesModel');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'Success!' });
});

server.get('/games', async (req, res) => {
  console.log("We're in.");
  try {
    const gameInfo = await games.getAll();
    console.log('Game info', gameInfo);
    res.status(200).json(gameInfo);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post('/games', async (req, res) => {
  console.log("We're in.");
  try {
    const info = req.body;
    const gameResponse = await games.insert(info);
    res.status(201).json(`Added game: ${info.title}`);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = server;
