const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("api running");
});

server.post("/games", (req, res) => {
  if (!req.body.title || !req.body.genre) {
    res.status(422).json({ error: "WRONG" });
  } else {
    res.status(201).json(req.body);
  }
});

module.exports = server;
