const express = require('express');
const server = express();

server.use(express.json());

let gamesDB = [{
  title: 'Pacman',
  genre: 'Arcade',
  releaseYear: 1980
}];

server.get('/games', (req, res) => {
  res.status(200).json(gamesDB);
});

server.post('/games', (req, res) => {
  if (req.body.title && req.body.genre) {
    const sameGame = gamesDB.filter(game => (game.title === req.body.title));
    console.log('SAMEGAME:', sameGame);
    if (sameGame.length) {
      res.status(405).json({ message: 'The game you are entering already exists'});
    }
    else {
      gamesDB.push(req.body);
      res.status(201).json({ message: 'Your game was saved!'});
      gamesDB = [{
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980
      }];
    }
  }
  else {
    res.status(422).json({ message: 'Please input complete game information to save!'})
  }
})

module.exports = server;
