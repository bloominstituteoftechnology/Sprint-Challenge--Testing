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

    if (gameData.name) {
      const count = await games.insert(gameData);
      res.status(201).json(ids);
    } else {
      res.status(400).json({ error: 'Body missing info' });
    }
  }

  catch (err) {
    res.status(500).json({ error: 'Database go boom' });
  }

})