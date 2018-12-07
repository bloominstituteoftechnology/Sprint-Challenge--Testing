const express = require('express');

const server = express();

server.use(express.json());

const game = [];

const games = [
    {
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
    },
    {
        title: 'Contra', // required
        genre: 'Arcade', // required
        releaseYear: 1981 // not required
    },
    {
        title: 'Commando', // required
        genre: 'Arcade', // required
        releaseYear: 1982 // not required
    },
];

// empty array

server.get('/game', (req, res) => {
    res.status(200).json(game);
});

// GET ENDPOINTS

server.get('/', (req, res) => {
    res.status(200).json({ message: 'server is up' });
});

server.get('/games', (req, res) => {
    res.status(200).json(games);
});

//POST ENDPOINT 
// server.post('/games', (req, res) => {
//     const { title, genre, releaseYear } = req.body;
//     if (!title || !genre) {
//         res.status(422).json({ message: `Both title and genre are required` });
//     } else {
//         games.push(req.body)
//         res.status(200).json(games);
//     }
// });

server.post('/games', (req, res) => {
    const { title, genre, releaseYear } = req.body;
    if (!title || !genre) {
        res.status(422).json({ message: `Both title and genre are required` });
    } else if (games.filter(game=> game.title === title).length === 0)
    {   games.push(req.body)
        res.status(200).json(games);
    } else{
        res.status(405).json({ message: `title already exists` });

    }
});


module.exports = server;