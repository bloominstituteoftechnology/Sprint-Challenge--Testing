const express = require("express");

const server = express();

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

module.exports = server;
