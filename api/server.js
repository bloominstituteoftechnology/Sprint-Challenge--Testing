const express = require('express');

const Games = require('../games/gamesModel.js');
const db = require('../data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up and running!' });
});

server.get('/games', (req, res) => {
    Games.getAll()
      .then(games => {
        res.status(200).json(games);
      })
      .catch(error => {
        res.status(500).json(error);
      });
});

server.get('/games/:id', async (req, res) => {
  try {
    const game = await Games.getById(req.params.id);
    if(game) {
      res.status(200).json(game);
    } else {
      res.status(500).json({error: error, message: `Game with requested id (${req.params.id}) is not found`});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post('/games', (req, res) => {
    const { title, genre, releaseYear } = req.body;
    if (!title || !genre) {
      return res.status(422).json({ error: 'title and genre are required' });
    } else {
      const newGame = { title, genre, releaseYear };
      if (!Games.getGameByFilter({title: newGame.title})) {
        res.status(405).json({ error: 'Need a unique title' });
      } else {
        Games.insert(newGame)
        .then(games => {
            res.status(201).json(games);
        })
        .catch(error => {
            res.status(500).json(error);
        });
      }
    }
});

module.exports = server;