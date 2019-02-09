const express = require('express');
const server = express();
server.use(express.json());
const db = require('./database/dbConfig');

server.post('/games',(req,res) => {
  let game = req.body;
  if(game.title && game.genre && game.releaseYear){
  db('games').insert(game)
  .then(id => {
    res.send(id).status(201)
  })
  } else {
    res.status(422).send('incomplete information')
  }
})

module.exports = server;

