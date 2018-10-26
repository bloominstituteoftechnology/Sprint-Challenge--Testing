// --- Node Dependencies
const express = require('express');
const helmet = require('helmet');

// --- Instantiate Server ---
const server = express();

// --- Implement Middleware ---
server.use(express.json(), helmet());

// --- Data Resource ---
let games = [
    {
        id : 0,
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
      },
      {
        id : 1,
        title: 'Joust', // required
        genre: 'Arcade', // required
        releaseYear: 1982 // not required
      }
]

let id = 1;

/// ----- CRUD Endpoints -----
// --- Test GET Endpoint ---
server.get('/testmebaby/149', (request, response) => {
    response.status(200).json('One More Time');
})

// --- GET All Games Endpoint ---
server.get('/games', (request, response) => {
    response.status(200).json(games);
})

// --- Export Server ---
module.exports = server;