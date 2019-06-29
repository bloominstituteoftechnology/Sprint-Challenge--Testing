const express = require('express');
const helmet = require('helmet');
const db = require('../games/games-model.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' })
})

server.get('/games', (req, res) => {
  db.getGames()
  .then(games => {
    res.status(200).json(games)
  })
  .catch(err => {
    res.status(500).json(error);
  })
})

server.post('/games', (req, res) => {
  if( req.body.title && req.body.genre) {
    const newGame = db.insert(req.body)
      .then(newGame => {
        if(newGame) {
        res.status(200).json(newGame)
      } else {
        res.status(422).json({ message: 'missing title and genre'})
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
})

module.exports = server;
