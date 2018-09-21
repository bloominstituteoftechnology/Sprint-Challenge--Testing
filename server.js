const express = require("express");
const server = express();

server.use(express.json());

let games = [
  { id: 0, title: "Monopoly", genre: "boardgame", releaseYear: 1980 },
  { id: 1, title: "Chess", genre: "boardgame", releaseYear: 1500 }
];

server.get("/", (req, res) => {
  res.status(200).json("Root route");
});

server.get("/games", (req, res) => {
  res.status(200).json(games);
});

module.exports = server;
