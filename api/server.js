const express = require("express");

const server = express();

server.use(express.json());

const games = [];

let id = 0;

//POST Endpoint
server.post("/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  id++;
  if (!title || !genre || !releaseYear) {
    return res
      .status(422)
      .json({ error: "Please provide a title, genre, and release year." });
  }
  games.push({ title: title, genre: genre, releaseYear: releaseYear });
  res
    .status(200)
    .json({ id: id, title: title, genre: genre, releaseYear: releaseYear });
});

//GET Endpoint
server.get("/games", (req, res) => {
  res.status(200).json(games);
});

server.get("/games/:id", (req, res) => {
  const game = games.filter(game => game.id === req.params.id)[0];
  res.status(200).json(game);
});

//DELETE Endpoint

server.delete("/games/:id", (req, res) => {
  const { id } = req.params;
  if (id === req.params.id) {
    res.status(200).json({ deleted: `${id}` });
  } else {
    res.status(404).json({ error: "The specified ID does not exist" });
  }
});

module.exports = server;
