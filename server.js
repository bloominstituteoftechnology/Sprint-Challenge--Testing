const express = require('express');

const server = express();
server.use(express.json());

const games = [];

server.post("/games", (req, res) => {
  const { title, genre } = req.body;

  if (!title || !genre) {
    return res.status(422).json({ error: "Incorrect info was provided: { title, genre}" });
  }
  games.push({ title: title, genre: genre });
  res.status(200).json({ title: title, genre: genre });
});

server.get('/games', (req, res) => {
    res.status(200).json(games);
});

module.exports = server;
