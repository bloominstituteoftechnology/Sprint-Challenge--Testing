const express = require("express");
const server = express();

server.use(express.json());

const db = [
  {
    title: "Pacman", // required
    genre: "Arcade", // required
    releaseYear: 1980 // not required
  },
  {
    title: "Super Mario",
    genre: "Platform",
    releaseYear: 1985
  },
  {
    title: "Donkey Kong",
    genre: "Platform",
    releaseYear: 1981
  }
];

// endpoints
// root path
server.get("/", (_, res) => {
  res.status(200).json({ api: "running..." });
});

// GET /games
server.get("/games", (_, res) => {
  res.status(200).json(db);
});

// POST /games
server.post("/games", (req, res) => {
  const game = req.body;

  if (!game.title || !game.genre) {
    return res.status(422).json({ message: "title and genre are required" });
  } else {
    db.push(game);
    res.status(201).json({ message: "game created" });
  }
});

module.exports = server;
