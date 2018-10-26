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
const db = require("./data/data.js");

//routes
server.get("/", (req, res) => {
  res.send("up and running...");
});

server.post("/games", (req, res) => {
  const newGame = req.body;

  if (!newGame.name || !newGame.genre) {
    res.status(422).json({ message: "Bad request" });
  } else {
    //games.push(newGame);
    db.insert(newGame)
      .then(idObj => res.status(201).json({ message: "New game was added" }))
      .catch(err =>
        res.status(500).json({ error: "There was an error adding the game" })
      );
  }
});

server.get("/games", (req, res) => {
  db.get()
    .then(games => res.status(200).json(games))
    .catch(err =>
      res.status(500).json({ error: "There was an error getting games" })
    );
});

module.exports = server;
