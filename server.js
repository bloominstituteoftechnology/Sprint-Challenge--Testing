const express = require('express');
const server = express();
const gameData = [{ 
  title: 'Pacman', 
  genre: 'Arcade',
  releaseYear: 1980
}];

server.use(express.json());

server.post('/games', (req, res) => {
  const { title, genre, releaseYear } = req.body;
  let isReqValid = true;
  if (!title) {
    res.status(422).json({ error: 'You need a title.' });
  } else if (!genre) {
    res.status(422).json({ error: 'You need a genre.' });
  } else {
    gameData.forEach(g => {
      if (g.title === title) {
        isReqValid = false;
      }
    });
    if (isReqValid) {
      const game = { title: title, genre: genre, releaseYear: releaseYear };
      gameData.push(game);
      res.status(201).json(game);
    } else {
      res.status(405).json({ error: 'You need a unique title.' });
    }
  }
  
});

server.get('/games', (req, res) => {
  res.status(200).json(gameData);
});


module.exports = server;