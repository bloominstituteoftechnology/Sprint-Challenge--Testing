const express = require("express");

const server = express();

server.use(express.json());

let db = [
  { id: 0, title: "crossword", genre: "casual", releaseYear: "1920" },
  { id: 1, title: "bingo", genere: "party", releaseYear: "1910" },
  { id: 2, title: "chess", genre: "strategy", releaseYear: "1" }
];

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.get("/games", (req, res) => {
  res.status(200).json(db);
});

server.post("/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title) {
    res.status(422).json({ message: "need game" });
  }
  for (i = 0; i < db.length; i++) {
    if (db[i].title == title) {
      res.status(405).json({ message: "not allowed duplicate game" });
    }
  }
  res.status(201).json({ title, genre, releaseYear });
});

server.delete("/games/:id", (req, res) => {
  const { id } = req.params;
  for (i = 0; i < db.length; i++) {
    if (id == db[i].id) res.status(200).json({ message: "game deleted" });
  }
});

module.exports = { server, db };
