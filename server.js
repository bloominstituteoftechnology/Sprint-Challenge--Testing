const express = require('express');
const server = express();

server.use(express.json());

let gamesArr = [];

server.get('/', (req, res) => {
    res.status(200).json('API Running');
});

server.get('/games', (req, res) => {
    res.status(200).json(gamesArr);
});

server.post('/games', (req, res) => {
    const game = req.body;
    if (!game.title || !game.genre) {
        res.status(422).json({ error: "Please provide a title and genre for the game." });
    } else if (gamesArr.filter(obj => obj.title === game.title).length > 0) {
        res.status(405).json({ error: "Please provide a unique title for the game." });
    } else {
        gamesArr.push(game);
        res.status(201).json(game);
    } 
});


module.exports = server;