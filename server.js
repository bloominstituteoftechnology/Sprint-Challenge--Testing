const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();

server.use(express.json());
server.use(helmet());

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);


server.get('/games', (req, res) => {
  db('games').select()
  .then(games => {
    games.length === 0 ?
    res.status(400).json({message: 'No games Listed'})
    :
    res.status(200).json(games)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: 'unable to get games'})
  })
});

server.post('/games', (req, res) => {
  !req.body.title || !req.body.genre ?
  res.status(422).json({message: 'You need a valid title AND genre'})
  :
  null
  db('games').insert(req.body)
  .then(newId => {
    res.status(200).json(newId)
  })
  .catch(err => {
    res.status(500).json({message: 'unable to insert game'})
  })
});

server.delete('/games/:id', (req, res) => {
  const { id } = req.params;
  db('games').where({id}).del()
  .then(count => {
    res.status(200).json(count)
  })
  .catch(err => {
    res.status(500).json({message: 'unable to delete game'})
  })
});


module.exports = server;
