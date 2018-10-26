const express = require('express');
const server = express();
server.use(express.json());
const knex = require('knex');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

server.get('/', (req, res) => {
  res.status(200).json({ message: "Server running" });
});

server.get('/games', (req, res) => {
  db('games')
    .then(games => {

      if (!games || games.length < 1) {
        res.status(404).json(games)
      } else {
        res.status(200).json(games);
      }

    })
    .catch(err => res.status(500).json({ error: 'Could not retrieve games list' }, err));
});

server.post('/games', (req, res) => {
  
})

module.exports = server;