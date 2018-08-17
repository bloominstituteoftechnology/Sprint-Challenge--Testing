const express = require('express');
const server = express();

server.use(express.json());

const games = [{
  title: 'Pacman', // required
  genre: 'Arcade', // required
  releaseYear: 1980 // not required
}];

module.exports = server;
