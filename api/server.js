const express = require('express');
const request = require('supertest');


const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'server is running' });
});

let games = [];

server.post('/games', (req, res) => {
  const newGame = req.body; 
  if (!newGame.title) {
    res.status(400).json('Error: No game title provided');
  } else if (typeof newGame.releaseYear !== 'number') {
    res.status(400).json('Error: Release Year must be a number');
  }
  games.push(newGame);
  res.status(200).json(newGame);    
});

module.exports = server;