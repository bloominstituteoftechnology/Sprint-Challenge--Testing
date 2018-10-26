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
  let { title, genre, releaseYear } = req.body;

  db.insert({ title, genre, releaseYear })
    .into('games')
    .then(game => {

      if(!req.body.title || !req.body.genre || req.body.title.length < 1 || req.body.genre.length < 1 ) {
        throw new Error(res.status(422).json({ fillError: 'Please enter a title and genre' }));        
      } else if (typeof req.body.title !== 'string' || typeof req.body.genre !== 'string') {
        return res.status(422).json({ fillError: 'Please enter the title and genre of the game as a string' });
      }
       else {
        res.status(201).json({ gameId: game });
      }

    })
    .catch(err => res.status(500).json({ error: `There was an error adding the game to the database, please try again, and give a title and genre` }));
})

server.delete('/games/:id', (req, res) => {
  const { id } = req.params;

  db('games').where({ id }).del()
    .then(response => {
      if (response) {
        res.status(200).json({ success: 'game deleted' });
      } else {
        res.status(404).json({ missingError: 'Could not find order by that ID' });
      }
    })
    .catch(err => res.status(500).json(err));
})

module.exports = server;