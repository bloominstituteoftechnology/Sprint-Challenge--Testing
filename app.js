const express = require('express');
const app = express();

app.use(express.json());

const games = [];

app.get('/', (req, res)=>{
  return res.status(200).json('Yo');
});

app.post('/games',(req,res)=>{
  let game = req.body;
  console.log(game);
  if (!game.genre || !game.title) {
    res.status(422).json({message: 'incomplete data'});
  } else {
    games.push(game)
    res.status(201).json(games);
  } 

});

app.get('/games', (req, res) => {
  res.status(200).json(games);
});

module.exports = app;