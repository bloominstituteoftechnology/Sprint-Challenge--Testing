const express = require('express');
const server = express();

server.use(express.json());

const games = [];

server.post('/games', (req, res) => {
  const { title, genre, releaseYear } = req.body;
  const newGame = { title, genre, releaseYear };
  if (!title || !genre || !releaseYear) {
    res
      .status(422)
      .json({ message: 'please include title, genre and year of release' });
  } else {
    games.push(newGame);
    res.status(200).json({
      wow: `${title} is a great ${genre} game from ${releaseYear}!`,
    });
  }
});

module.exports = server;
