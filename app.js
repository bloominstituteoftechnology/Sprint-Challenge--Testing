const express = require('express');
const app = express();

app.use(express.json());

const games = [];

app.get('/', (req, res)=>{
  return res.status(200).json('Yo');
});

app.post('/games',(req,res)=>{
  let game = req.body;
  if(game.title){
    games.push(game)
    res.status(201).json(games);
  }
});

app.get('/games', (req, res) => {
  res.status(200).json(games);
});

module.exports = app;