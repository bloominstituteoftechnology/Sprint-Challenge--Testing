const express = require("express");
const Games = require("../Games/gamesModel.js");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ API: "UP" });
});

server.get('/games', async (req, res) => {
  const game = Games.getAll()
    .then((game) => {
      res.status(200).json(game);
  }).catch((err) => {
    res.status(500).json({message: err.message})
  })
})

server.post('/games', async (req, res) => {
  const { title, genre, releaseYear} = req.body;
  try{
    if((title, genre, releaseYear)) {
      Games.add(req.body);
      res.status(201).json(req.body);
    } else {
      res.status(422).json({mesage: 'Please fill out all fields.'})
    }
  } catch(err){
      res.status(500).json({message: err.message});
  }
})

module.exports = server;
