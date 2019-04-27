const express = require("express");

const server = express();

server.use(express.json());

module.exports = server;

// TEST ENDPOINT FUNCTIONALITY
server.get('/', async (req, res) => {
    res
        .status(200)
        .json({ API: 'UP AND RUNNING' });
});


// GAMES OBJECT
let games = [
    {
        title: 'Super Smash Bros.',
        genre: 'Action',
        releaseYear: 1999
    },
    {
        title: 'Super Smash Bros. Melee',
        genre: 'Perfection',
        releaseYear: 2001
    },
    {
        title: 'Super Smash Bros. Brawl',
        genre: 'Party',
        releaseYear: 2006
    },
    {
        title: 'Super Smash Bros. Ultimate',
        genre: 'Fighting',
        releaseYear: 2018
    }
  ];

// GET GAMES ENDPOINT
server.get('/games', (req, res) => {
    res
        .status(200)
        .json(games);
})

// POST GAMES ENPOINT
server.post('/games', (req, res) => {
    let {title, genre} = req.body;
    if (title && genre){
        res
            .status(201).json(req.body);
    }else{
        res
            .status(422)
            .json({message : "Missing Info"});
    }
});