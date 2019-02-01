const express = require('express');

const games = require('../games/gamesModel');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'Success!' });
});

server.get('/games', async (req, res) => {
  try {
    const gameInfo = await games.getAll();
    res.status(200).json(gameInfo);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/games/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const count = await games.getId(id);
    if (count.length === 0) {
      res.status(404).json({ message: 'Unable to find game with that ID.' });
    } else {
      res.status(200).json(count);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post('/games', async (req, res) => {
  try {
    const info = req.body;
    if (info.title && info.genre && info.releaseYear) {
      if (
        typeof info.title !== 'string' ||
        typeof info.genre !== 'string' ||
        typeof info.releaseYear !== 'number'
      ) {
        res.status(400).json(`You haven't inserted the correct type of data.`);
      } else {
        const gameResponse = await games.insert(info);
        res.status(201).json(`Added game: ${info.title}`);
      }
    } else {
      res.status(422).json(`You haven't entered the correct information.`);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = server;
