const express = require('express');

const server = express();

server.use(express.json());

let localDb = [
    {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980
    }
];

server.post('/games', (req, res) => {
    const {title, genre, releaseYear} = req.body;

    if(!title || !genre) {
        res.status(422).json({REQUIRED: 'Missing Title and/or Genre'});
    }else{
    localDb = [...localDb, req.body];
    res.status(201).send(localDb);
    }
});

server.get('/games', (req, res) => {
    if(localDb.length === 0) {
        res.status(200).json({localDb: []});
    }
    res.status(200).json(localDb);
});

module.exports = server;