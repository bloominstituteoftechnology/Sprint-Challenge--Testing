const express = require('express');

const server = express();

server.use(express.json());

const games = [
  {
    title: 'Pacman',
    genre: 'Arcade',
    releaseYear: 1980
  },
  {
    title: 'Marvel vs Capcom',
    genre: 'Arcade',
    releaseYear: 1985
  },
  {
    title: 'Starship',
    genre: 'Arcade',
    releaseYear: 1970
  },
]

server.get('/', (req, res) => {
  res.status(200).send({ api: "running" });
});

server.get('/games', (req, res) => {
  res.status(200).send(games);
  if (!games) {
    return res.status(200).json([]);
  } else {
    return res.status(200).json(games);
  }
});

server.post("/games", async (req, res) => {
  if (!req.body.title || !req.body.genre) {
    return res.status(422).json({
      errorMessage: "Required fields are incomplete."
    });
  } else {
    const game = await req.body;
    return res.status(200).json(game);
  }
});

module.exports = server;