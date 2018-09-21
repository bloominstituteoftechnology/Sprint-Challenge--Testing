const express = require("express");
const server = express();

server.use(express.json());

let games = [
  { id: 0, title: "Monopoly", genre: "boardgame", releaseYear: 1980 },
  { id: 1, title: "Chess", genre: "boardgame", releaseYear: 1500 }
];

server.get("/", (req, res) => {
  res.status(200).json("Root route");
});

server.get("/games", (req, res) => {
  res.status(200).json(games);
});

server.post("/games", (req, res) => {
  const game = req.body;
  if (game.title && game.genre) {
    if (games.find(currentGame => currentGame.title === game.title)) {
      res.status(400).json({ message: "This game already exists" });
    } else {
      let id = games.length;
      game.id = id;
      games.push(game);
      res.status(200).json(games);
    }
  } else {
    res
      .status(422)
      .json({ message: "Title and Genre are required for entry." });
  }
});

module.exports = server;
