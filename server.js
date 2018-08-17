const express = require("express");

const server = express();
server.use(express.json());

const db = {
  games: [
    {
      title: "Monopoly",
      genre: "board",
      releaseYear: 1945
    },
    {
      title: "Risk",
      genre: "board",
      releaseYear: 1955
    },
    {
      title: "Clue",
      genre: "board",
      releaseYear: 1925
    },
    {
      title: "Life",
      genre: "board",
      releaseYear: 1985
    }
  ]
};

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.get("/games", (req, res) => {
    res.status(200).json(db.games);
  });




  

module.exports = { server, db };
