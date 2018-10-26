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

// --- GET Individual Game Endpoint ---
server.get('/games/:id', (request, response) => {
    // Extract URL Parameters
    const { id } = request.params;

    for ( i = 0; i < games.length; i++ ) {

        console.log("game:", games[i])
        if (Number(games[i].id) === Number(id)) {
            return response.status(200).json(games[i]);
        }
    }

    response.status(404).json({ errorMessage: "No game was found with an id matching the provided id." });
});

// --- POST Game Endpoint ---
server.post('/games', (request, response) => {
    // Deconstruct Request Body
    let { title, genre, releaseYear } = request.body;

    // Validation
    if ( !title || !genre ) {
        return response.status(422).json({ errorMessage: 'You must provide a title and genre when adding a game.' })
    }

    for ( i = 0; i < games.length; i++ ) {
        if (games[i].title === title) {
            return response.status(405).json({ errorMessage: "A game with that title was already added. Titles must be unique." })
        }
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


// --- DELETE Game Endpoint ---
server.delete('/games/:id', (request, response) => {
    // Get URL Params
    const gameId = request.params.id;
    let idExists = false;

    for (i = 0; i < games.length; i++) {
        if (Number(games[i].id) === Number(gameId)) {
            idExists = i;
        }
    }

    if ( !idExists && idExists !== 0 ) {
        return response.status(404).json({errorMessage: "We were unable to delete the game with the provided id."})
    }

    games = games.slice(0, idExists).concat(games.slice(idExists + 1, games.length));
    response.status(200).json({ gameId });
});

// --- Export Server ---
module.exports = server;