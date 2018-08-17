const express = require("express");

const server = express();
server.use(express.json());

const db = {
  games: [
      // To run test on returning en empty array if there are no games stored,
      // comment out all games inside here

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

    // Comment out everything above this
  ]
};

    

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.get("/games", (req, res) => {
    res.status(200).json(db.games);
  });

  server.post("/games", (req, res) => {
    const { title, genre, releaseYear } = req.body;
    if (!title || !genre) {
      res.status(422).json({ message: `need title and genre bro` });
    }
    res.status(201).json({ title, genre, releaseYear });
  });
  






module.exports = { server, db };
