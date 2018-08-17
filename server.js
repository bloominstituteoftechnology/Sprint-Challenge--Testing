const express = require("express");
const server = express();
const games = require("./games");

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send(games);
});

server.post("/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title || !genre) {
    res.status(422).json({ error: "Please include a title and genre for the game." });
  } else {
    games.push(req.body);
    res.status(201).json(req.body);
  }
});

module.exports = server;
