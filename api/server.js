const express = require('express');
const helmet = require('helmet');
const server = express();

server.use(express.json(), helmet());

let games = {
  title: 'Pacman',
  genre: 'Arcade',
  releaseYear: 1980
}


module.exports = server;
