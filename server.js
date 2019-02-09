const express = require("express");
const server = express();

server.use(express.json());

module.exports = server;

let gamesDB = [];
let nextId = 1;

server.post("/games", (req, res) => {
    if (req.body && req.body.title && req.body.genre) {
        let newGame = {
            id: nextId,
            title: req.body.title,
            genre: req.body.genre,
        }

        if (req.body.releaseYear)
            newGame.releaseYear = req.body.releaseYear;
        
        gamesDB.push(newGame);
        nextId++;

        res.status(201).json(gamesDB[nextId-2].id);
    } else {
        res.status(422).json({ error: "malformed game data" });
    }
});

server.get("/games", (req, res) => {
    res.status(200).json(gamesDB);
});