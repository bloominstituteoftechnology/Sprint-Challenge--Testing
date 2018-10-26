const express = require('express');

const server = express();
server.use(express.json());

let gameTitles = [
    {
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
    }, 
    {
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
    }, 
    {
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
    }, 
    {   
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
    }, 
    {
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
    }, 
]

server.get('/games', (req, res) => {
    if(!gameTitles.length) {
        res
            .status(200)
            .json([]);
    }
    res
        .status(200)
        .json({ games: gameTitles });
});

server.post('/games/add', (req, res) => {
    const { title, genre, releaseYear } = req.body;
    console.log(req.body);
    
    if(!title || !genre) {
        res
            .status(422)
            .json({ message: 'unable to add game without title and genre' });
    } else {
        games = [...gameTitles, req.body];

        res
            .status(200)
            .json(games);
    }
})

module.exports = server;