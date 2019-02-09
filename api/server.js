const express = require("express");

const games = require("../games/gamesModel.js");

const server = express();

server.use(express.json());

server.get("/games", async (req, res) => {
  try {
    const rows = await games.fetch();
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: "trouble getting games" });
  }
});

server.post("/games", async (req, res) => {
  try {
    const newGame = req.body;
    const response = await games.insert(newGame);
    if (
      newGame.title &&
      typeof newGame.title === "string" &&
      newGame.title !== ""
    ) {
      if (
        newGame.genre &&
        typeof newGame.genre === "string" &&
        newGame.genre !== ""
      ) {
        if (newGame.releaseYear) {
          if (typeof newGame.releaseYear === "number") {
            res.status(201).json(response);
          } else {
            // releaseYear NAN
            res.status(422).json({ error: "releaseYear must be a number" });
          }
        } else {
          res.status(201).json(response);
        }
      } else {
        // bad genre
        res
          .status(422)
          .json({ error: "genre must be included and must be a string" });
      }
    } else {
      // bad title
      res
        .status(422)
        .json({ error: "title must be included and must be a string" });
    }
  } catch (err) {
    res.status(500).json({ error: "trouble adding game" });
  }
});

module.exports = server;
