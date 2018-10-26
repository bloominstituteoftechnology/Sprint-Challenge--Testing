const express = require("express");
const server = express();
server.use(express.json());

let gameData = [
  {
    id: 1,
    title: "Pacman",
    genre: "Arcade",
    releaseYear: 1980
  },
  {
    id: 2,
    title: "Galaxian",
    genre: "Arcade",
    releaseYear: 1979
  }
];
