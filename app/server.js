const express = require("express");
const helmet = require("helmet");
const server = express();
server.use(express.json(), helmet());
const db = require("./database");

server.post("/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  const game = { title, genre, releaseYear };
  if (!title || !genre || !releaseYear) {
    const missing = [];
    if (!title) missing.push("missing title");
    if (!genre) {
      missing.push("missing genre");
    }
    if (!releaseYear) {
      missing.push("missing release year");
    }
    return res.status(422).json({ message: missing });
  } else {
    if (game) {
      db.insert(game)
        .into("games")
        .then(count => {
          res.status(201).json(count);
        })
        .catch(err => res.status(500).json(err));
    }
  }
});

server.get("/games", (req, res) => {
  db("games")
    .then(games => {
      res.status(200).json(games);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = server;
