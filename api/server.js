const express = require('express');

const server = express();

server.use(express.json());

let gameArray = [];

server.get('/', (req, res) => {
  res.status(200).json({ message: 'server is operational, keep working!' });
});

server.get('/games', (req, res) => {
    try {
    res.status(200).json(gameArray);
    } catch (error) {
        res.status(500).json(error);
    }
});

server.post('/games', (req, res) => {
    const game = req.body;

    const { title, genre, releaseYear } = game;
    
    if ((!title) || (!genre)) {
        res.status(422).json({ message: "Incomplete data" });
    } else {
        
    try {
        gameArray = gameArray.push(game);
        res.status(201).json({ game })
    } catch (error) {
        res.status(500).json(error);
    }}});

module.exports = server;