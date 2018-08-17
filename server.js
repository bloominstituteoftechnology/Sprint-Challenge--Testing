const express = require("express");

const server = express();

server.use(express.json());

let db = [
  { title: "crossword", genre: "casual", releaseYear: "1920" },
  { game: "bingo", genere: "party", releaseYear: "1910" },
  { game: "chess", genre: "strategy", releaseYear: "1" }
];

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.get("/games", (req, res) => {
  res.status(200).json(db);
});

server.post("/games", (req, res) => {
  const { game } = req.body;
  if (!game) {
    res.status(422).json({ message: "need game" });
  }
  res.status(201).json({ game });
});

module.exports = { server, db };
