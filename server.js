const express = require('express');

const server = express();

server.use(express.json());

let games = [
  { id: 1, title: 'Pokemon', genre: 'Adventure', releaseYear: 2000 },
  { id: 2, title: 'League of Legends', genre: 'MOBA', releaseYear: 2007 }
];

server.get('/games', (req, res) => {
  res.status(200).json(games);
});

server.post('/games', (req, res) => {
  const game = req.body;
  if (game.title && game.genre) {
    if (games.find(existingGame => existingGame.title === game.title)) {
      res
        .status(405)
        .json({ message: 'Title already exists, please try another game.' });
    } else {
      let id = games.length + 1;
      game.id = id;
      games.push(game);
      res.status(201).json(games);
    }
  } else {
    res
      .status(422)
      .json({ message: 'Title and genre are required, please try again.' });
  }
});

module.exports = server;
