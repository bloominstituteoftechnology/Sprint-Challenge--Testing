const express = require('express');

const server = express();

// middleware
server.use(express.json());

// make some test data
const games = [
    {title: 'Minecraft', genre: 'Sandbox', releaseYear: 2009},
    {title: 'Fortnite', genre: 'Battle Royale', releaseYear: 2017},
    {title: 'StarCraft II', genre: 'RTS', releaseYear: 2010}
]

// endpoints
server.post('/games', (req, res) => {
    const { title, genre } = req.body;

    if(!title || !genre) {
        res.status(422).end();
    } else {
        games.push(req.body)
        res.status(200).json(req.body);
    }
});

server.get('/games', (req, res) => {    
    res.status(200).json(games);
})

module.exports = server;