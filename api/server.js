const express = require("express");
const games = require("../games/games.js");
const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
   res.status(200).json({api: "up and running"});
});

server.get('/games', async (req, res) => {
   const rows = await games.getAll();
 
   res.status(200).json(rows);
 });

module.exports = server;