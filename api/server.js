const express = require('express');

const games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());

server.get('/games', async (req, res) => {
  return null
})

server.post('/games', async (req, res) => {
  return null
})

module.exports = server;