const express = require('express');

const games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());

server.get('/games', async (req, res) => {
  try {
    const rows = await games.fetch();
    res.status(200).json(rows);
  }
  catch(err) {
    res.status(500).json({error: "trouble getting games"})
  }
})

// server.post('/games', async (req, res) => {
//   return null
// })

module.exports = server;