const express = require('express');
const server = express();
server.use(express.json());

server.get('/games', (req, res) => {
    res.status(200).json([1,2]);
    // res.status(200).json([]);
    // res.status(200).json('hey');
    // res.status(200).json({hey: 'you'});
});

server.post('/games', (req, res) => {
    const { title, genre, releaseYear } = req.body;
    if ( !title || !genre ) {
        return res.status(422).json([]);
    };
    res.status(201).json([]);
});

module.exports = server;