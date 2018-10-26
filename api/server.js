const express = require('express');

const server = express();

server.use(express.json());

// DATABASE
let gamesDb = [];

// Sanity Check
server.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is up!' });
});

// Get list of games
server.get('/games', (req, res) => {
    // If the database is empty, return empty array
    // and set the database
    if (gamesDb.length <= 0) {
        gamesDb = [
            {
                id: 0,
                title: 'Pacman', // required
                genre: 'Arcade', // required
                releaseYear: 1980 // not required
            },
            {
                id: 1,
                title: 'Rocket Knight Adventures',
                genre: 'Platformer',
                releaseYear: 1993
            },
            {
                id: 2,
                title: 'Metal Slug',
                genre: 'Platformer',
                releaseYear: 1996
            },
            {
                id: 3,
                title: 'Sonic R',
                genre: 'Racing',
                releaseYear: 1997
            }
            
        ];

        return res.status(200).json({ data: [] });
    }

    res.status(200).json({ data: gamesDb });
});

// Get game by ID
server.get('/games/:id', (req, res) => {
    const { id } = req.params;

    // Filter the database and set game to the specific game
    let game = gamesDb.filter(el => el.id === Number(id));

    // If no game, return 404 with no game found
    if(!game || game.length <= 0) res.status(404).json({message: 'Game not found'});
    res.status(200).json({ data: game });
});

// Post to games database
server.post('/games', (req, res) => {
    const { game } = req.body;

    // If game does not title nor genre, return 422 and specify needs title and genre
    if(!game.title || !game.genre) return res.status(422).json({ message: 'Must have a title and genre'});
    
    // Loop through each of the games and check whether
    // the game's title match, if true, return 405
    // stating title's must not match
    gamesDb.forEach( el => {
        if(el.title === game.title) return res.status(405).json({ message: 'Title must not be the same'});
    })

    // Increment system
    let count = gamesDb.length;
    const newGame = {
        id: count,
        ...game
    }

    gamesDb.push(newGame);
    res.status(201).json({ data: gamesDb });
});

// Delete game by ID
server.delete('/games/:id', (req, res) => {
    const { id } = req.params;
    let found = false;

    // create a new database and filter thru the old one
    // excluding the game to be deleted. Set found to true
    // if the game exists
    let newDb = gamesDb.filter(el => {
        if(el.id === Number(id)) found = true;
        return el.id !== Number(id);
    });

    // Set the existing database to the new one
    gamesDb = newDb;
    
    // If no game, return 404 with game not found
    if(!found) return res.status(404).json({message: 'Game not found'});

    // Return the game's ID back to the client
    res.status(200).json(Number(id));
});
module.exports = server;