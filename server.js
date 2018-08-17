const express = require('express');
const server = express();

server.use(express.json());

const games = [{
  title: 'Pacman',
  genre: 'Arcade',
  releaseYear: 1980
}];

server.get('/', (req, res) => {
  res.status(200).json({api: 'API is up and running'})
})

server.get('/games', (req, res) => {
  res.status(200).json(games)
})

server.post('/games', (req, res) => {
  const game = req.body;
  if(!game.title || !game.genre) {
    res.status(422).json({ error: 'Please provide title and genre'});
  }
  for(let i = 0; i < games.length; i++) {
    if(game.title === games[i].title) {
      res.status(405).json({ error: 'Cannot have duplicate games'})
    }
  }
  games.push(game);
  res.status(201).json({ game });
})


module.exports = { server, games };
