const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => res.send("Welcome to Game API!"));

server.post("/games", (req, res) => {
  const { title, genre } = req.body;
  if (title && genre) {
    res.status(201).json(req.body);
  } else {
    res
      .status(422)
      .json({ message: "Please provide a title and genre for the game." });
  }
});

server.get("/games", (req, res) => {
  Object.keys(req.body).length
    ? res.status(200).json([req.body])
    : res.status(200).json([]);
});

module.exports = server;
