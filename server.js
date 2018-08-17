const express = require("express");
const server = express();
const games = require("./games");

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send(games);
});

server.post("/games", (req, res) => {
  const gameTitles = [];
  games.forEach(game => gameTitles.push(game.title));

  const { title, genre, releaseYear } = req.body;
  if (!title || !genre) {
    res.status(422).json({ error: "Please include a title and genre for the game." });
  } else if (gameTitles.includes(title)) {
    res
      .status(405)
      .json({ error: "This game is already in the game database, please add another." });
  } else {
    games.push(req.body);
    res.status(201).json(req.body);
  }
});

module.exports = server;
