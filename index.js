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

module.exports = server;
