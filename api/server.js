const express = require('express');
const configMiddleware = require('../config/middleware');
const server = express();
const db = require('../data/dbConfig');

configMiddleware(server);

server.get('/games', async (res, req) => {
   const games = await db('games');
   res.statusCode(200).json(games);
});

server.post('/games', async (req, res) => {
   const game = req.body;
   const result = await db('games').insert(game);
   res.status(201).json(result);
});

module.exports = server;
