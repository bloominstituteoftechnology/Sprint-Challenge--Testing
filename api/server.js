const express = require("express");
const Games = require("./games");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h1>Hello World</h1>`);
});

server.get("/games", async (req, res) => {
  try {
    const games = await Games.getAll();

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error });
  }
});

server.post("/games", async (req, res) => {
  const { title, genre } = req.body;

  if (!title || !genre) {
    return res.status(422).json({ message: "Please supply the correct information" });
  }

  try {
    const games = await Games.insert(req.body);

    res.status(200).json(games);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = server;