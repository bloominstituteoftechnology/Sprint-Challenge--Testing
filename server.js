const express = require('express');
const server = express();

server.use(express.json());

server.get('/games', (req, res) => {
  res.status(200).json({games: 'array of games'});
});




module.exports = server;