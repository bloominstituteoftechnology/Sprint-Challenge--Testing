const express = require('express');

const server = express();
server.use(express.json());

let games = [
    // {
    //     id : 0,
    //     title: 'Pacman', // required
    //     genre: 'Arcade', // required
    //     releaseYear: 1980 // not required
    // }
]

const title = 'Video Game Man';
const genre = 'action-adventure';
const releaseYear = '1986';

let gameTest = { 
    title: title,
    genre: genre,
    releaseYear: releaseYear
 }

server.get('/games', (req, res) => {
    if(games.length === 0) {
        res
            .status(200)
            .json([]);
    }
    res
        .status(200)
        .json(games);
});

server.post('/games/add', (req, res) => {
    
    
    if(title.length === 0 || genre.length === 0) {
        res
            .status(422)
            .json({ ERROR: 'unable to add game without title and genre' });
    }

    res
        .status(200)
        .json(gameTest);
})

module.exports = server;