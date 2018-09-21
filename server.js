const express = require("express");
const server = express();
server.use(express.json());

let games = {
  title: "Pacman",
  genre: "Arcade",
  releaseYear: 1980
};

server.get("/games", async (req, res) => {
  res.status(200).json(games);
});
server.post("/games", async (req, res) => {
        res.status(200).json(games);
});

module.exports = server;
