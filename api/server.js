const express = require('express');
const knex = require('knex');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);
const server = express();

server.use(express.json());

// sanity check endpoint
server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.post('/games', (req,res) => {
  const { title, genre, releaseYear } = req.body;
  const data = { title, genre, releaseYear };
  if (!title || !genre){
    res.status(422).json({ message: 'incomplete data' });
  }
  db('games')
    .insert(data)
    .returning('id')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ message: 'error inserting name', err });
    });
});

server.get('/games', (req, res) => {
  db('games')
    .then(games => {
      res.status(200).json(games);
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

module.exports = server;
