const express = require("express");
const server = express();
server.use(express.json());

let games = [];

let gameId = 1;

server.get("/games", (req, res) => {
  res.status(200).json(games);
});

server.listen(9000, () => {
  console.log("Listening on port 9000.");
});

module.exports = server;
