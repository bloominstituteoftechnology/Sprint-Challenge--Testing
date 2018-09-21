const express = require("express");

const server = express();

server.use(express.json());

const gamesArr = [];

server.post("/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title || !genre) {
    res.status(422).json({ message: "missing information" });
  } else if (gamesArr.filter(game => game.title === title).length > 0) {
    res.status(405).json({ message: "title already exists" });
  } else {
    gamesArr.push(req.body);
    res.status(200).json({ Added: `${title} ${genre} ${releaseYear}` });
  }
});

server.get("/games", (req, res) => {
  res.status(200).json(gamesArr);
});

module.exports = {
  server,
  gamesArr
};
