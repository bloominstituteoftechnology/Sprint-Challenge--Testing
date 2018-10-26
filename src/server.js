const express = require("express");
const server = express();
server.use(express.json());

let gameData = [
  {
    id: 1,
    title: "Pacman",
    genre: "Arcade",
    releaseYear: 1980
  },
  {
    id: 2,
    title: "Galaxian",
    genre: "Arcade",
    releaseYear: 1979
  }
];

// Post Game
server.post("/games", (req, res) => {
  // make sure that the title genre and releaseYear are present in the body otherwise return status of 442
  if (!req.body.title || !req.body.genre || !req.body.releaseYear) {
    return res.status(422).json();
  }

  // synthesize id for data member using the previous data member id + 1
  req.body.id = games[games.length - 1].id + 1;
  return res.status(201).json(req.body);
});

// Get Games
server.get("/games", (req, res) => {
  return res.status(200).json(games);
});

// export server
module.exports = server;
