const express = require("express");
const server = express();
const db = require("./database/games.js");

server.use(express.json());

// **Endpoint check ** //
server.get('/', (req, res) => {
  res.status(200).json({ API: 'We running young padawans!!' });
});

// **GET** //
server.get("/games", (req, res) => {
  res.status(200).json(db.games);
});

// **POST (NEWGAME) ** //
server.post("/games", (req, res) => {
  const id = db.games.length.toString();
  const { title, genre, releaseYear } = req.body;
  if (!title || !genre) {
    res.status(422).json({ message: "Yo...you're missing stuff" });
  } else {
    const newgame = { id, title, genre, releaseYear };
    db.games.push(newgame);
    res.status(200).json(db.games);
  }
});


module.exports = server;