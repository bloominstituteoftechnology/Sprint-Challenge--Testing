const express = require('express');
const configMiddleware = require('../config/middleware');
const server = express();
const db = require('../data/dbConfig');

configMiddleware(server);

server.get('/', (req, res) => {
   res.status(200).send('Sanity check');
});

server.get('/games', async (req, res) => {
   const games = await db('games');

   try {
      res.status(200).json(games);
   } catch (err) {
      res.status(500).json(err);
   }
});

server.get('/games', async (req, res) => {
   try {
      const games = await db('games');
      res.status(200).json(games);
   } catch (err) {
      res.status(500).json({ message: 'failed' });
   }
});

server.post('/games', async (req, res) => {
   const game = req.body;

   try {
      const result = await db.insert(game).into('games');
      res.status(201).json(result);
   } catch (err) {
      res.status(422).json(err);
   }
});

module.exports = server;
