const express = require("express");
const helmet = require("helmet");
const server = express();

//apply middleware
server.use(helmet());
server.use(express.json());

//in-memory db:
let games = [
  { name: "Pac Man", genre: "Arcade", releaseYear: 1980 },
  { name: "Street Fighter", genre: "Arcade", releaseYear: 1987 }
];

//routes
server.get("/", (req, res) => {
  res.send("up and running...");
});

server.post("/games", (req, res) => {
  const newGame = req.body;

  if (!newGame.title || !newGame.genre) {
    res.status(422).json({ message: "Bad request" });
  } else {
    games.push(newGame);
    res.status(201).json({ message: "New game was added" });
  }
});

server.get("/games", (req, res) => {
  res.status(200).json(games);
});

module.exports = server;
