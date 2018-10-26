const express = require("express");

const server = express();

server.use(express.json());

const games = [
  {
    id: "1",
    title: "Final Fantasy VII",
    genre: "RPG",
    releaseDate: 1 / 31 / 1997
  },
  {
    id: "2",
    title: "Final Fantasy VIII",
    genre: "RPG",
    releaseDate: 2 / 11 / 1999
  },
  {
    id: "3",
    title: "Final Fantasy IX",
    genre: "RPG",
    releaseDate: 7 / 7 / 2000
  },
  {
    id: "4",
    title: "Final Fantasy X",
    genre: "RPG",
    releaseDate: 7 / 19 / 2001
  },
  {
    id: "5",
    title: "The Witcher 3",
    genre: "RPG",
    releaseDate: 5 / 19 / 2015
  }
];

//sanity check
server.get("/", (req, res) => {
  res.send("server is up");
});

server.get("/games", (req, res) => {
  res.status(200).send(games);
});

module.exports = server;
