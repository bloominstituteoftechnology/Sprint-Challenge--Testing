const express = require('express');

const server = express();
server.use(express.json());

let games = [];

let nextId = 0;

const getId = () => {
  return nextId++;
};

//get all games
server.get('/games', (req, res) => {
  res.status(200).json(games);
});

//add a new game
server.post('/games', (req, res) => {

});

module.exports = server;
