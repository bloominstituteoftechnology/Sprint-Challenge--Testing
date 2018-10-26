const data = [
    {
        "title": "Pacman",
        "genre": "Arcade",
        "releaseYear": 1980
    },
    {
        "title": "NFL Blitz",
        "genre": "Personal Console",
        "releaseYear": 2000
    },
    {
        "title": "Settlers of Catan",
        "genre": "Board",
        "releaseYear": 1995
    }
];

const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({message: 'server up'});
});

module.exports = server; 