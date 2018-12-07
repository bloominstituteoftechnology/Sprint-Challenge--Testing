const express = require('express');
const server = express();
const db = require('../data/dbConfig');

server.use(express.json());

server.get('/games', (req, res) => {
    db('games')
    .then(games => res.status(200).json(games))
    .catch(error =>res.status(500).json(error))
})

server.post('/games', (req, res) => {
    const { title, genre, releaseYear } = req.body;

    if(!title || !genre){
        res.status(422).json({ message: 'Please add the title and genre' });
    }else{
        res.status(201).json({ message: 'game added' });
    }
})

module.exports = server;
