// imports
const express = require("express");

// instantiate server
const server = express();
server.use(express.json());

// games array
const games = [];

// endpoints
server.post("/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  const newGame = req.body;
  if (!title || !genre) {
    res.status(422).json({ error: "Missing Title or Genre" });
  } else {
    games.push(newGame);
    res.status(201).json({
      Message: `${title} ${genre} from ${releaseYear} has been added`
    });
  }
});

server.get("/games", (req, res) => {
  res.status(200).json(games);
});

// server port
const port = 4000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = server;
