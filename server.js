const express = require("express");

const server = express();
server.use(express.json());

let games = [];

server.get("games", (req, res) => {
  res.status(200).json(games);
});

server.post("./games", (req, res) => {
  const { title, genre } = req.body;

  if (!title || !genre) {
    return res.status(422).json({ error: "Please enter valid input" });
  } else {
    const newOne = {
      ...req.body
    };
    games.push(newOne);
    res.status(201).json(newOne);
  }
});

module.exports = server;
