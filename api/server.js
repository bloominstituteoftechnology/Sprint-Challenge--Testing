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
      }
];

let id = 0;

/// ----- CRUD Endpoints -----
// --- Test GET Endpoint ---
server.get('/testmebaby/149', (request, response) => {
    response.status(200).json('One More Time');
});

// --- GET All Games Endpoint ---
server.get('/games', (request, response) => {
    response.status(200).json(games);
});

// ---- POST Game Endpoint ---
server.post('/games', (request, response) => {
    // Deconstruct Request Body
    let { title, genre, releaseYear } = request.body;

    if ( !title || !genre ) {
        return response.status(422).json({errorMessage: 'You must provide a title and genre when adding a game.'})
    }

    if ( !releaseYear ) {
        releaseYear = '';
    }

    id++;

    // Construct Game Object
    const gameObject = { id: id, title: title, genre: genre, releaseYear: releaseYear }

    games.push(gameObject)

    response.status(201).json(gameObject);
});

// --- Export Server ---
module.exports = server;