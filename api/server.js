const express = require('express');
const server = express();
const db = require('../data/dbConfig.js');

server.use(express.json());

// R O O T
server.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to root' });
});

// G E T
server.get('/games', (req, res) => {
  db('games')
    .then(game => res.status(200).json(game))
    .catch(err => res.status(500).json(err));
});

// P O S T
server.post('/games', (req, res) => {
  const game = req.body;

  if (!game.title || !game.genre) {
    res.status(422).json({ message: 'Title and genre cannot be blank' });
  }
  db('games')
    .insert(game)
    .then(id => {
      res.status(201).json({ message: `successfully added` });
    })
    .catch(err => res.send(err));
});

// G E T   B Y   I D
server.get('/games/:id', (req, res) => {
  const { id } = req.params;

  db('games')
    .where({ id: id })
    .first()
    .then(game => {
      if (game) {
        db('games')
          .where({ id: id })
          .then(game => {
            res.status(200).json(game);
          })
          .catch(err => res.status(500).json(err));
      } else {
        res.status(404).json('Game does not exist');
      }
    });
});

// D E L E T E   B Y   I D
server.delete('/games/:id', (req, res) => {
  const { id } = req.params;

  db('games')
    .where({ id: id })
    .del()
    .then(game => {
      res.status(200).json(game);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = server;
