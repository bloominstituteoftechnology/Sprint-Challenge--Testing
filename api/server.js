const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'server is working' });
});


function logger(req, res, next){
    console.log(`${req.method} to ${req.url}`);
    next();
}

server.use(logger);

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

server.get('/games', (req, res) => {
    res.status(200).json(games);
})

server.post('/games', (req, res) => {
    let {title, genre, releaseYear} = req.body;
    // check for required fields
    if (!title || !genre){
        return res.status(422).json({ error: 'You must include a title and genre.' })
    }

    // STRETCH
    //send error 419 if game title is not unique
     // collect all game titles
     let allTitles = [];
     for (i = 0; i < games.length; i++) {
         allTitles.push(games[i].title);
     }
     // compare given title to current titles
     if (allTitles.includes(req.body.title)) {
        return res.status(419).json({ error: 'That game is already added.' })
     }

    return res.status(201).json({ message: `${title} added to games database.` })
})


module.exports = server;