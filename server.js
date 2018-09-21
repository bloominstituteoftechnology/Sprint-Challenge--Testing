const express = require('express');
const server = express();

server.use(express.json());


server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' })
});

const games = [];
let id = 0;

server.post('/games', (req, res) => {
    const {title, genre, releaseYear} = req.body;

    if(!title || !genre) {
        return res.status(422).json({message: 'Required fields: Title & Genre!!!!!!!!'});
    };

    const game = {id: id++, title, genre, releaseYear};
    games.push(game);
    res.status(201).json(game);
});



module.exports = server;
