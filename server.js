const express = require("express");
const server = express();
server.use(express.json());

let games = [

];

// Sanity check
server.get("/", (req, res) => {
	res.status(200).json({ message: "server is operational" });
});
////

//GET Endpoint
server.get("/api/games", (req, res) => {
  res.status(200).json(games);
});
////

//POST Endpoint
server.post("/api/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  //if request body is missing any of those components
  if (!title || !genre || !releaseYear) {
    return res
      .status(422)
      .json({ error: "Must include title, genre, and release year" });
  }
  else {
    games.push({ title: title, genre: genre, releaseYear: releaseYear });
    res
    .status(200)
    .json({ title: title, genre: genre, releaseYear: releaseYear });
  }
});
/////

//Delete Endpoint
server.delete("/api/games/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    res.status(200).json({ gameDeleted: `${id}` });
  } else {
    res.status(404).json({ error: "Couldn't locate game to delete" });
  }
});
////
module.exports = server;