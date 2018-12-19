const express = require("express");
const server = express();

server.use(express.json());

let games = [
  {
    title: "Spider Man",
    genre: "Action",
    releaseYear: 2018
  }
];

server.post("/games", (req, res) => {
  const {title, genre} = req.body;
  !title || !genre
    ? res.status(422).json({error: "title and genre required"})
    : res.status(201).json({success: "game added"});
});

server.get("/games", (req, res) => {
  res.status(200).json(games);
});

const port = process.env.PORT || 9000;

module.exports = server;
