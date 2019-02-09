const express = require('express');
const server = express();
const db = require('./Data/games_data');



server.get('/api/games', (req, res) => {
    res.status(200).json(db)
});

server.post('/api/games', (req, res) => {
   const game = req.body;
   db("games").insert(game).then(newGame => {
       res.status(201).send(newGame);
   })
 })
 
module.exports = server;



