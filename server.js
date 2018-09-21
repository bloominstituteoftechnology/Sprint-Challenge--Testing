const express = require("express");

const server = express();

server.use(express.json());

const gamesArr = [];

server.post("/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (title && genre) {
    gamesArr.push(req.body);
    res.status(200).json({ Added: `${title} ${genre} ${releaseYear}` });
  } else {
    res.status(422).json({ message: "missing information" });
  }
});

module.exports = {
  server,
  gamesArr
};
