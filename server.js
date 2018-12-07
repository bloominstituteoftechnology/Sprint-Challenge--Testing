// dependency imports
const express = require("express");

//internal imports
const db = require("./data/dbConfig");

// init server
const server = express();

// middleware
server.use(express.json());

// endpoints
// sanity
server.get("/", (req, res) => {
  res.status(200).json({ server: "running" });
});

server.post("/games", (req, res) => {
  const game = req.body;

  if (!game.title || !game.genre) {
    res.status(422).json({
      message:
        "Please fill out at least title and genre fields before submitting"
    });
  } else {
    db("games")
      .insert(game)
      .then(id => res.status(201).json(id))
      .catch(err => res.status(500).json(err));
  }
});

server.get("/games", (req, res) => {
  // todo
});

const port = process.env.PORT || 6000;

module.exports = server;
