const express = require("express");
const server = express();
const gamesDb = require("./db/games.js");

server.use(express.json());

// test endpoint
server.get("/", (req, res) => {
  const passedBody = { api: "running" };
  res.status(200).json(passedBody);
});

// === Game Endpoints === //
// GET all
server.get("/games", (req, res) => {
  const gamesArray = gamesDb.games;
  res.status(200).json(gamesArray);
  // uncomment for empty games tests
  // const emptyGames = [];
  // res.status(200).json(emptyGames);
});

// GET individual game
server.get("/games/:id", (req, res) => {
  const { id } = req.params;
  let game = [];
  console.log("GAMES DATA", gamesDb.games[9]);
  for (let i = 0; i < gamesDb.games.length; i++) {
    if (gamesDb.games[i].id === id && gamesDb.games[i].id !== "undefined") {
      game.push(gamesDb.games[i]);
    }
  }
  // check to see if game is in array
  if (game.length === 0) {
    return res.status(404).json({ message: "game not found" });
  }
  res.status(200).json(game);
});

// POST (create) new game
server.post("/games/", (req, res) => {
  const id = gamesDb.games.length.toString();
  const { title, genre, releaseYear } = req.body;
  if (!title || !genre) {
    res.status(422).json({ message: "missing one or more required fields" });
  } else {
    for (let i = 0; i < gamesDb.games.length; i++) {
      if (Object.values(gamesDb.games[i]).includes(title)) {
        return res.status(405).json({ message: "not allowed" });
      } else {
        const newgame = { id, title, genre, releaseYear };
        gamesDb.games.push(newgame);
        // console.log("GAME RESPONSE", gamesDb.games[3]);
        return res.status(200).json(gamesDb.games);
      }
    }
  }
});

module.exports = server;
