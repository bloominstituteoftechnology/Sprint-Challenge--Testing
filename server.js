const express = require("express");

const server = express();
const games = [
  {
    title: "Pacman", // required
    genre: "Arcade", // required
    releaseYear: 1980 // not required
  },
  {
    title: "Fortnite", // required
    genre: "Shooter", // required
    releaseYear: 2017 // not required
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
  } else if (games.find(game => game.title === req.body.title) != undefined) {
    return res.status(405).json({
      errorMessage: "Game title already exists."
    });
  } else {
    const game = await req.body;

    return res.status(201).json(game);
  }
});

server.get("/games", (req, res) => {
  if (!games) {
    return res.status(200).json([]);
  } else {
    return res.status(200).json(games);
  }
});

module.exports = server;
