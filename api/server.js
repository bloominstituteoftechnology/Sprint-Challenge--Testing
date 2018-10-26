// Node Dependencies
const express = require('express');
const helmet = require('helmet');

// Server
const server = express();

// Middleware
server.use(express.json(), helmet());

// Data Resource
let games = [
  {
    id: 0,
    title: 'Pacman', // required
    genre: 'Arcade', // required
    releaseYear: 1980 // not required
  }
];
let id = 0;

// CRUD Endpoints

// Test Endpoint
server.get('/testme/', (request, response) => {
  response.status(200).json('One More Time');
});

// Export Server
module.exports = server;
