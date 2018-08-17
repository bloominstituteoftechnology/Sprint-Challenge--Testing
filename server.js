const express = require('express');
const server = express();
server.use(express.json());

const data = [
  {
    name: 'pac-man',
    genre: 'arcade',
    year: '1980'
  }
]


server.get('/games', (req, res)=>{
  res.status(200).json(data) 
})

server.post('/games', (req, res) =>{
  const {name, genre, year} = req.body;
  if (!genre || !name) {
    res.status(422).json({"error": "missing required information"})
  }

  const game = {name, genre, year}
  res.status(201).json(game) 
})





module.exports = server;