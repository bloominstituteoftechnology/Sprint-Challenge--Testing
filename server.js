const express = require('express');

const server = express();
server.use(express.json());

let games = [];

let nextId = 1;

const getId = () => {
  return nextId++;
};

//get all games
server.get('/games', (req, res) => {
  res.status(200).json(games);
});

//get a game by id
server.get('/games/:id', (req, res) => {
  const { id } = req.params;
  const game = games.filter(g => parseInt(g.id, 10) === parseInt(id, 10));
  if(game.length === 1){
    res.status(200).json(game[0]);
  }else{
    res.status(404).json({ message: 'No game by that id' });
  }
});

//add a new game
server.post('/games', (req, res) => {
  const { title, genre } = req.body;

  if(!title || !genre){
    res.status(422).json({ message: 'Missing data' });
  }else{
    if(games.some(game => game.title === title)){
      res.status(405).json({ message: 'That title already exists in storage' });
    }else{
      const newGame = {
        ...req.body,
        id: getId()
      };
      games.push(newGame);
      res.status(201).json(newGame);
    }
  }
});

//delete a game by id
server.delete('/games/:id', async (req, res) => {
  const { id } = req.params;
  if(!games.some(g => Number(g.id) === Number(id))){
    res.status(404).json({ message: 'No game by that id' });
  }else{
    games = games.filter(g => Number(g.id) !== Number(id));
    res.status(200).json(Number(id));
  }
});

module.exports = server;
