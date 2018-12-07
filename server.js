const express = require("express");

const server = express();

server.use(express.json());

// dummy data
const data = [
  {
    title: "Counter-Strike",
    genre: "shooter",
    year: 2000
  },
  {
    title: "Red Dead Redemption 2",
    genre: "Open World",
    year: "2018"
  }
];

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

// get all games
server.get("/games", (req, res) => {
  res.status(200).json(data);
});

// post games route
server.post("/games", (req, res) => {
  const { title, genre, year } = req.body;

  if (!title || !genre) {
    res.status(500).json({ error: "Game title and genre are required" });
  } else {
    res.status(201).json(req.body);
  }
});

module.exports = server;
