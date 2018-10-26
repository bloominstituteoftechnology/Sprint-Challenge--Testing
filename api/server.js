const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({message: 'server is working'});
});


function logger(req, res, next){
    console.log(`${req.method} to ${req.url}`);
    next();
}

server.use(logger);

// endpoints go here
server.get('/games', (req, res) => {
    const games = [
        {
            title: 'Pacman',
            genre: 'Arcade',
            releaseYear: 1980
        },
        {
            title: 'Final Fantasy VII',
            genre: 'RPG',
            releaseYear: 1997
        },
        {
            title: 'Parasite Eve',
            genre: 'Horror',
            releaseYear: 1995
        }
    ];

    res.status(200).json(games);
})

server.post('/games', (req, res) => {
    let {title, genre, releaseYear} = req.body;
    // check for required fields
    if(!title || !genre){
        return res.status(422).json({error: 'You must include a title and genre.'})
    }

    return res.status(201).json({message: `${title} added to games database.`})
})


module.exports = server;