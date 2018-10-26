const express = require('express');

const server = express();

server.use(express.json());

let gameArray = [];

server.get('/', (req, res) => {
  res.status(200).json({ message: 'server is operational, keep working!' });
});

server.get('/games', (req, res) => {
    try {
    res.status(200).send(gameArray);
    } catch (error) {
        res.status(500).json(error);
    }
});

server.post('/games', (req, res) => {
    const game = req.body;

    const { title, genre } = game;
    
    if ((!title) || (!genre)) {
        res.status(422).json({ message: "Incomplete data" });
    } else {
    gameArray.push(game)
    .then(array => {
        res.status(201).json(array[0]);
    })
    .catch(err => {
        res.status(500).json(err);
    });
}
});

module.exports = server;