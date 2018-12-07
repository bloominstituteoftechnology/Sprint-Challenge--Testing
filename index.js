const express = require("express");
const server = express();
server.use(express.json());

let games = [];

let gameId = 1;

server.get("/games", (req, res) => {
  res.status(200).json(games);
});

server.post("/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title || !genre) {
    res.status(422).json({ error: "Please provide a title and genre." });
    return;
  }
  const newGame = { title, genre, releaseYear, id: gameId };
  games.push(newGame);
  res.status(201).json(newGame);
  gameId++;
});

server.listen(9000, () => {
  console.log("Listening on port 9000.");
});

module.exports = server;
