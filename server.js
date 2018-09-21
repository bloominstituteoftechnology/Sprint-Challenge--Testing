const express = require("express");
const server = express();
const gamesDb = require("./db/games.js");

server.use(express.json());

// test endpoint
server.get("/", (req, res) => {
  const passedBody = { api: "running" };
  res.status(200).json(passedBody);
});

// Game endpoints
// GET all
server.get("/games", (req, res) => {
  res.status(200).json(gamesDb.games);
});

// POST (create) new game
server.post("/games/", (req, res) => {
  const id = gamesDb.games.length.toString();
  const { title, genre, releaseYear } = req.body;
  if (!title || !genre) {
    res.status(422).json({ message: "missing one or more required fields" });
  } else {
    const newgame = { id, title, genre, releaseYear };
    gamesDb.games.push(newgame);
    // console.log("GAME RESPONSE", gamesDb.games[3]);
    res.status(200).json(gamesDb.games);
  }
});

module.exports = server;
