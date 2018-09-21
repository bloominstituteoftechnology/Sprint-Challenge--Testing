const express = require("express");

const app = express();

const games = [];

let nextId = 1;

app.use(express.json());

app.get("/games", (req, res) => {
  res.status(200).json(games);
});

app.get("/games/:id", (req, res) => {
  const game = games.find(game => game.id === Number(req.params.id));
  if (!game) res.status(404).end();
  res.status(200).json(game);
});

app.post("/games", (req, res) => {
  const { title, genre } = req.body;

  if (!title || !genre) return res.status(422).end();

  if (games.some(game => game.title === title)) return res.status(405).end();

  const newGame = {
    id: nextId++,
    title,
    genre,
  };
  games.push(newGame);
  res.status(201).json(newGame);
});

module.exports = app;
