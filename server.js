const express = require('express');
const server = express();

server.use(express.json());

let gamesDB = [];

server.get('/games', (req, res) => {
  res.status(200).json(gamesDB);
});

server.post('/games', (req, res) => {
  if (req.body.title && req.body.genre) {
    gamesDB.push(req.body);
    res.status(201).json({ message: 'Your game was saved!'})
  }
  else {
    res.status(422).json({ message: 'Please input complete game information to save!'})
  }
})

module.exports = server;
