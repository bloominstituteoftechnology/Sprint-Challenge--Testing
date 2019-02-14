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
    .catch(err => res.send(err))
  })
  } else {
    res.status(422).send('incomplete information')
  }
  
})

server.get('/games', async (req,res) => {
   let rows = await db('games');
   res.status(200).json(rows)
})


module.exports = server;

