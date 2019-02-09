const express = require('express');

const games = require('../helper/helper.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/games', async (req, res) => {
  const rows = await games.getAll();

  res.status(200).json(rows);
});

server.post('/games', async (req, res) => {
    const gameData = req.body;
   console.log(gameData)
    if (gameData.title) {
      const ids = await games.insert(gameData);
      res.status(201).json(ids);
    } else {
      res.status(400).json({error: 'missing title in body'})
    }

})
module.exports = server;