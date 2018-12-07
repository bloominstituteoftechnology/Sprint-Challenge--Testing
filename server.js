const express = require("express");

const server = express();

server.use(express.json());

games = [
  {
    title: "Pacman",
    genre: "Arcade",
    releaseYear: 1980
  },
  {
    title: "Overwatch",
    genre: "FPS",
    releaseYear: 2016
  }
];

// ENDPOINTS

server.get("/", (req, res) => {
  res.status(200).json({ message: "Up and Running" });
});

// GET /games

server.get("/games", (req, res) => {
  res.status(200).json(games);
});

// POST /games

server.post("/games", (req, res) => {
  const game = req.body;

  if (!game.title || !game.genre) {
    return res
      .status(422)
      .json({ message: "Please include a title and genre" });
  } else {
    games.push(game);
    res.status(201).json({ message: "Game added to the database" });
  }
});

module.exports = server;
