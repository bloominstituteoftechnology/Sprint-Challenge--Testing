const express = require('express');

const server = express();
server.use(express.json());

let games = [];

let nextId = 1;

const getId = () => {
  return nextId++;
};

//get all games
server.get('/games', (req, res) => {
  res.status(200).json(games);
});

//add a new game
server.post('/games', (req, res) => {
  const { title, genre } = req.body;

  if(!title || !genre){
    return res.status(422).json({ message: 'Missing data' });
  }else{
    const newGame = {
      ...req.body,
      id: getId()
    };
    games.push(newGame);
    res.status(201).json(newGame);
  }
});

module.exports = server;
