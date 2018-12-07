const express = require("express");
const server = express();
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const db = knex(knexConfig.development);
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.get("/games", (req, res) => {
  db("games")
    .then(project => res.status(200).json(project))
    .catch(err => res.status(500).json(err));
});

server.post("/games", (req, res) => {
  const game = req.body;
  console.log(game);
  if (!game.title || !game.genre) {
    return res
      .status(422)
      .json({ message: "Entires must include a title and a genre" });
  }
  db("games")
    .insert(game)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => res.status(500).json({ message: "error registering game" }));
});

module.exports = server;
