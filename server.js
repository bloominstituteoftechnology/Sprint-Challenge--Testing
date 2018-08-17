const express = require("express");

const server = express();
server.use(express.json());

const db = {games: ['Monopoly', 'Risk', 'Clue', 'Life', 'Trivia Pursuit', 'Sorry!']}

server.get("/", (req, res) => {
    res.status(200).json({ api: "running" });
  });






  module.exports = { server, db };