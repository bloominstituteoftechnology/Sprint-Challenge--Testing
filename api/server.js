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

server.delete('/games/:id', async (req, res) => {
    try {
      const {id} = req.params;
      const count = await games.remove(id);
  
      if(!count || count < 1){
          res.status(404).json({message: "Game was not found to be removed"})
      } else{
          res.status(200).json(count);
      }
    }
    catch (err) {
      res.status(500).json({message: "There was an error while trying to delete a game from the data base"});
      }
  });



module.exports = server;