const express = require("express");

const server = express();

server.use(express.json());

let game = [
  {
    title: "Pacman", // required
    genre: "Arcade", // required
    releaseYear: 1980 // not required
  }
];

server.get("/", (req, res) => {
  res.send("api running");
});

server.post("/games", (req, res) => {
  if (!req.body.title || !req.body.genre) {
    res.status(422).json({ error: "WRONG" });
  } else {
    res.status(201).json(req.body);
  }
});

server.get("/games", (req, res) => {
  res.status(200).json(game);
});

module.exports = server;
