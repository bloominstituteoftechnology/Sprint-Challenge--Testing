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

    if(games.find(game => game.title === title)){
        return res.status(405).json({message: 'Game with this title already exists!!!'});
    };

    const game = {id: id++, title, genre, releaseYear};
    games.push(game);
    res.status(201).json(game);
});

server.get('/games', (req, res) => {
    res.status(200).json(games);
});



module.exports = server;
