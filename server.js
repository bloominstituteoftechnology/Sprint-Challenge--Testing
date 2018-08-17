const express = require("express");

const server = express();
const games = [
  {
    title: "Pacman", // required
    genre: "Arcade", // required
    releaseYear: 1980 // not required
  },
  {
    title: "Pacman", // required
    genre: "Arcade", // required
    releaseYear: 1980 // not required
  }
];

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.post("/games", async (req, res) => {
  if (!req.body.title || !req.body.genre) {
    return res.status(422).json({
      errorMessage: "Required fields are incomplete."
    });
  } else {
    const game = await req.body;
    return res.status(201).json(game);
  }
});

server.get("/games", (req, res) => {
  res.status(200).json(games);
});

module.exports = server;
