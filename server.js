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

module.exports = server;
