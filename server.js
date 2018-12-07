const express = require("express");
const server = express();

server.use(express.json());

let gamesDb = [
  {
    _id: 1,
    title: "Pacman", // required
    genre: "Arcade", // required
    releaseYear: 1980 // not required
  },
  {
    _id: 2,
    title: "Super Mario",
    genre: "Platform",
    releaseYear: 1985
  },
  {
    _id: 3,
    title: "Donkey Kong",
    genre: "Platform",
    releaseYear: 1981
  }
];

let _id = 4;

// endpoints
// root path
server.get("/", (_, res) => {
  res.status(200).json({ api: "running..." });
});

// GET /games
server.get("/games", (_, res) => {
  res.status(200).json(gamesDb);
});

// POST /games
server.post("/games", (req, res) => {
  const game = req.body;
  const duplicate = gamesDb.filter(g => g.title === game.title);

  if (!game.title || !game.genre) {
    return res.status(422).json({ message: "title and genre are required" });
  } else if (duplicate.length === 0) {
    gamesDb.push({ _id, ...game });
    res.status(201).json({ message: "game created" });
  } else {
    return res.status(405).json({ message: "game duplicate" });
  }

  _id = _id + 1;
});

// GET /games/:id
server.get("/games/:id", (req, res) => {
  const { id } = req.params;
  const game = gamesDb.filter(g => g._id === Number(id));

  if (game.length === 0) {
    res.status(404).json({ message: "404 not found" });
  } else {
    res.status(200).json(game);
  }
});

// DELETE /games/:id
server.delete("/games/:id", (req, res) => {
  const { id } = req.params;
  const deleted = gamesDb.filter(g => g._id === Number(id));

  if (deleted.length === 0) {
    res.status(404).json({ message: "404 not found" });
  } else {
    gamesDb = gamesDb.filter(g => g._id !== Number(id));
    res.status(200).json({ message: `user deleted` });
  }
});

module.exports = server;
