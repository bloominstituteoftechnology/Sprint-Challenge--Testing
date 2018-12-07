const express = require('express');
const helmet = require('helmet');

const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

const server = express();
server.use(helmet());
server.use(express.json());


// check server is running
server.get('/', (req, res) => {
    res.status(200).json({ message: 'server is up' });
})

//get server
server.get('/games', (req, res) => {
    db('games')
      .select('id','title','genre')
      .then(games => {
        res.status(200).json(games);
      })
      .catch(err => res.status(500).json(err));
  });
  
  //post to server 
  server.post('/games', (req, res) => {
    const game = req.body;
    db.insert(game)
      .into('games')
      .then(games => {
            res.status(201).json(games[0])
      })
      .catch(err => {
        res.status(422).json(err);
      });
  });

  //edit server
  server.put('/games/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db('games')
      .where({ id: id })
      .update(changes)
      .then(count => {
        if (!count) {
          res.status(404).json({ message: 'No games found to update' });
        } else {
          res.status(200).json(count);
        }
      })
      .catch(err => res.status(500).json(err));
  });

  //delete
  server.delete('/games/:id', (req, res) => {
    const { id } = req.params;
    db('games')
      .where({ id })
      .delete(id)
      .then(count => {
        if (!count) {
          res.status(404).json({ message: 'No games found to delete' });
        } else {
          res.status(200).json(count);
        }
      })
      .catch(err => res.status(500).json(err));
  });
  module.exports = server; 