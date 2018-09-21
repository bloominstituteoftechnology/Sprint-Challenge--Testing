const express = require("express");

const server = express();

server.use(express.json());

let games = [
  {
    title: "Pacman",
    genre: "Arcade",
    releaseYear: 1980
  }
];

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.get("/games", (req, res) => {
  res.status(200).send(games);
});

server.post("/games", (req, res) => {
  const game = req.body;

  if (game.title && game.genre) {
    games.push(game);
    res.status(201).json(1);
  } else {
    res.status(422).json({ error: "Missing Parameters" });
  }
});

module.exports = server;
