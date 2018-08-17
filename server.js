const express = require('express');
const server = express();
server.use(express.json());

const data = [
  {
    name: 'pac-man',
    type: 'arcade',
    year: '1980'
  }
]
server.get('/games', (req, res)=>{
  res.status(200).json(data)
})

server.post('/games', (req, res) =>{
  const {name, type, year} = req.body;
  const game = {name, type, year}

  res.status(201).json(game)
})




module.exports = server;