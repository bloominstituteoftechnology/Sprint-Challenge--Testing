const express = require('express');
const server = express();

const db = [
  {title: 'Pacman', genre: 'Arcade', releaseYear: 1980},
  {title: 'Monopoly', genre: 'Board', releaseYear: 1935},
  {title: 'Tetris', genre: 'Arcade', releaseYear: 1984}
];

server.use(express.json());

// Endpoints go here

module.exports = server;