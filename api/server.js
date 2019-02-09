const express = require("express");

const server = express();

const games = [
  {
    title: "Pac-man",
    genre: "arcade",
    releaseYear: 1980
  }
];

server.use(express.json());

server.get("/games", (req, res) => {
  res.status(200).json(games);
});

module.exports = server;
