const express = require('express');
const server = express();
server.use(express.json());

const games = [];

// title: 'Pacman', // required
// genre: 'Arcade', // required
// releaseYear: 1980 // not required

server.get("/games", (req, res) => {
    res.status(200).json(games)
});

server.post("/games", (req, res) => {
    if (!req.body.title || !req.body.genre){
        res.status(422).json({ message: "please provide game name and genre"});
    }
    games.push(req.body)
    res.status(200).json(req.body)
});


module.exports = server;

