const express = require("express");
const server = express();
const db = require("../data/dbConfig");

server.use(express.json());

server.post("/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  db("games")
    .insert({ title, genre, releaseYear })
    .then(ids => {
      if (!title || !genre) {
        res.status(422).json({ message: "both title and genre are required" });
      } else {
        res.status(201).json({ message: `${title} successfully added` });
      }
    });
});

// server.get("/games", (req, res) => {
//   db('games')
//   if(  )
//   res.status(200).json(game);
// });

module.exports = server;
