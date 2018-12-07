const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);
const server = express();

server.use(express.json());


server.get('/', (req, res) => {
    res.status(200).json({ api: 'working' });
  });

  
server.get('/games', (req, res) => {
    db('games')
    .then(games => res.status(200).json(games))
    .catch(err => res.status(500).json(err));
});

server.post('/games',  (req, res) => {
   const { title, genre } = req.body;
   const game = req.body;
   if (!title || !genre) {
   res.status(422).json({ message: 'Name and genre required' });
   }
   db('games')
    .insert(game)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error inserting', err });
    });
});
   
 


module.exports = server;
