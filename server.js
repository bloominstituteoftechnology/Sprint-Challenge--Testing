const express = require('express');

const server = express();

server.use(express.json());

let games = [
  { id: 1, title: 'Pokemon', genre: 'Adventure', releaseYear: 2000 },
  { id: 2, title: 'League of Legends', genre: 'MOBA', releaseYear: 2007 }
];

module.exports = server;
