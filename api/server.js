const express = require("express");

const server = express();

server.use(express.json());

// const fakeDb = require("../data/fakeDb.js");
// const { games } = fakeDb;
const games = [
    {
        title: "StarCraft",
        genre: "RTS",
        releaseYear: 1997
    }
];

// Sanity check endpoint
server.get("/", (req, res) => {
    res.status(200).json({ api: "Up and connected" });
});

// Other endpoints
server.get("/api/games", (req, res) => {
    res.status(200).json(games);
});

server.post("/api/games", (req, res) => {
    const game = req.body;
    if (typeof game === "object" && game.title && game.genre) {
        games.push(game);
        res.status(201);
    } else {
        res.status(422).json({ message: "Incomplete game information" });
    }
});

// Export
module.exports = server;