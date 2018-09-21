const express = require("express");

const server = express();

server.use(express.json());

let games = [
  {
    id: 1,
    title: "Pacman",
    genre: "Arcade",
    releaseYear: 1980
  }
];

let id = 2;

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.get("/games", (req, res) => {
  res.status(200).send(games);
});

server.post("/games", (req, res) => {
  const newGame = req.body;

  if (newGame.title && newGame.genre) {
    let titles = games.filter(game => game.title === newGame.title);

    if (titles.length > 0) {
      res.status(405).json({ error: "Title already exists" });
    } else {
      games.push({ id: id, ...newGame });
      id++;
      res.status(201).json(1);
    }
  } else {
    res.status(422).json({ error: "Missing Parameters" });
  }
});

module.exports = server;
