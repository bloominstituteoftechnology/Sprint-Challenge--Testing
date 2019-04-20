const express = require('express');

const games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());

server.get('/games', async (req, res) => {
  try {
    const rows = await games.getAll();

    res.status(200).json(rows);
  }

  catch (err) {
    res.status(500).json({ error: 'Database go boom' });
  }

})

server.post('/games', async (req, res) => {
  try {
    const gameData = req.body;

    if (gameData.title && gameData.genre) {
      const count = await games.insert(gameData);
      res.status(201).json(count);
    } else {
      res.status(422).json({ error: 'Body missing info' });
    }
  }

  catch (err) {
    res.status(500).json({ error: 'Database go boom' });
  }

})

module.exports = server;