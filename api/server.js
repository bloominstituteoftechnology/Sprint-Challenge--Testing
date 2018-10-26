const express = require("express");

const server = express();

server.use(express.json());

const games = [];

server.get("/games", (req, res) => {
  res.status(200).json(games);
});

server.post("/games", (req, res) => {
  let game = req.body;
  if (!game.genre || !game.title) {
    res.status(422).json({ message: "information is incomplete" });
  } else {
    games.push(game);
    res.status(200).json(games);
  }
});

module.exports = server;
