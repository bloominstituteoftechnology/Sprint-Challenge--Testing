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
      db.select("*")
        .from("games")
        .then(games => {
          return games.forEach(g => {
            if (g.title === title) {
              return res.status(405).json({ message: "Title not unique" });
            }
          });
        });
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

server.get("/games/:id", (req, res) => {
  const { id } = req.params;
  db("games")
    .where({ id })
    .first()
    .then(game => {
      if (!game) {
        res.status(404).json({ message: "Game not found" });
      }
      if (game) {
        res.status(200).json(game);
      }
    })
    .catch(err => res.status(500).json(err));
});

server.delete("/games/:id", (req, res) => {
  const { id } = req.params;
  db("games")
    .where({ id })
    .del()
    .then(count => {
      if(!count) {
        res.status(404).json({message: "Game not found"});
      } else {
        res.status(200).json(count)
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = server;
