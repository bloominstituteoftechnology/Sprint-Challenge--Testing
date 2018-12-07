const knex = require('knex');
const express = require('express');

const server = express();
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);
server.use(express.json());

const config = require('./knexfile.js').development;

// sanity check
server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

let games = [
  {
    title: "Pacman",
    genre: "Arcade",
    releaseYear: 1980
  }
];

// post games endpoint
server.post('/games', (req, res) => {
  const { game } = req.body;
  if(!game.title || !game.genre) {
    res.status(422).json({ message: "information is incomplete" });
  } else {
    games.push(game);
    res.status(201).json({ message: "added successfully" });
  };
});

// get games endpoint
server.get('/games', (req, res) => {
  res.status(200).send(games);
})

module.exports = server;