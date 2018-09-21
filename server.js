const express = require("express");

const app = express();

const games = [
  {
    id: 1,
    title: "Pacman", // required
    genre: "Arcade", // required
    releaseYear: 1980, // not required
  },
  {
    id: 2,
    title: "NBA 2K", // required
    genre: "Sports", // required
  },
  {
    id: 3,
    title: "Witcher 3", // required
    genre: "RPG", // required
  },
];

let nextId = 4;

app.use(express.json());

app.post("/games", (req, res) => {
  const { title, genre } = req.body;
  if (!title || !genre) return res.status(422).end();
  const newGame = {
    id: nextId++,
    title,
    genre,
  };
  games.push(newGame);
  res.status(201).json(newGame);
});

module.exports = app;
