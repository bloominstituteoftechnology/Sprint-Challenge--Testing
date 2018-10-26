const express = require('express');

const server = express();

server.use(express.json());

const gamesList = [{ title: 'test', genre: 'test', releaseYear: 1}];
let count = 0;

server.post("/games", (req, res) => {
    const { title, genre, releaseYear } = req.body;
    if (!title || !genre) {
        res.status(422).json({ message: "please add title and genre" });
    }
    else {
        req.body.id = count++;
        gamesList.push(req.body);
        res.status(200).json({ latestAddition: `${title}` });
    }
});

server.get("/games", (req, res) => {
    res.status(200).json(gamesList);
});

server.get("/games/:id", (req, res) => {
    res.status(200).json(gamesList);
});

module.exports = server, gamesList;