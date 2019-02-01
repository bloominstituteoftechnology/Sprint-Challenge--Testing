const express = require('express');
const games = require('../games/gamesModel.js');
const server = express();
server.use(express.json());


server.get('/', async (req, res) => {
  
  res.status(200).json({message: "Testing the server"});
});

server.get('/games', async (req, res) => {
  try{
      const gamesList = await games.find();
      res.status(200).json(gamesList);
  } catch(err){
      res.status(500).json({message: "There was an error trying to connect to the data base"});
  }
});

server.post('/games', async (req, res) => {
  const game = req.body;
  try{
      if (game.title && typeof game.title === "string" && game.genre && typeof game.genre === "string") {
        const newGame = await games.add(game);
        res.status(201).json(newGame);
      } else {
        res.status(422).json({message: "Please enter title and genre of the game in a string format"});
      }
  } catch (err){
      res.status(500).json({message: "There was an error trying to add a new game to the data base"})
  }
});



module.exports = server;