const express = require("express");
const games = require("../games/games.js");
const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
   res.status(200).json({api: "up and running"});
});

server.get("/games", async (req, res) => {
   const rows = await games.getAll();
 
   res.status(200).json(rows);
});

server.post("/games", async (req, res) => {
   const game = req.body;
   if(game.title && game.genre){
      const ids = await games.insert(game);
      res.status(201).json(ids);
   } else {
      res.status(400).json({error: "please provide game title and/or genre"})
   }
});

module.exports = server;