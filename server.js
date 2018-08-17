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

server.get("/games/:id", (req, res) => {
  const { id } = req.params;
  const gameTitle = [];
  games.forEach(game => {
    if (game.id == id) {
      gameTitle.push(game);
    }
  });
  if (gameTitle.length > 0) {
    res.status(200).json(gameTitle[0]);
  } else {
    res.status(404).json({ error: "The game with the ID could not be found." });
  }
});

module.exports = server;
