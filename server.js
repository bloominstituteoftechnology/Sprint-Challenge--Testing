const express = require("express");
const server = express();
const games = require("./games");

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send(games);
});

module.exports = server;
