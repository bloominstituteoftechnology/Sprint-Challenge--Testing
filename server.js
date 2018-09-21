const express = require("express");
const server = express();
const gamesDb = require("./db/games.js");

server.use(express.json());

// test endpoint
server.get("/", (req, res) => {
  const passedBody = { api: "running" };
  res.status(200).json(passedBody);
});

// Game endpoints
// GET all
server.get("/games", (req, res) => {
  res.status(200).json(gamesDb.games);
});

module.exports = server;
