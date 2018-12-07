const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);
const server = express();

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "server is up" });
});

server.get("/games", (req, res) => {
  db("games")
    .select("id", "title", "genre", "releaseYear")
    .then(games => {
      res.status(200).json(games);
    })
    .catch(err => res.status(500).json(err.message));
});

server.post("/games", (req, res) => {
  const game = req.body;
  if (!req.body.title || !req.body.genre) {
    res.status(422).json(err.message);
  } else {
    db.insert(game)
      .into("games")
      .then(games => {
        res.status(201).json(games);
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  }
});

server.put("/games/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("games")
    .where({ id: id })
    .update(changes)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: "No records found to update" });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});
server.delete("/games/:id", (req, res) => {
  const { id } = req.params;
  db("games")
    .where({ id })
    .delete(id)
    .then(count => {
      if (!count || count < 1) {
        res
          .status(404)
          .json({ message: "There are no games with the specified i.d." });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});
module.exports = server;
