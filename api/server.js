//create express server
const express = require('express');
const server = express();

//add builtin middleware
server.use(express.json());

//import .json data file
const filename = '../data/games.json';
const games = require(filename);

//test server
server.get('/', (req, res)=>{
  res.json({Server:'Up and running!'});
})

//GET Route Handler
server.get('/games', (req, res)=>{
  res.status(200).json(games);
})

//POST Route Handler
server.post('/games', (req, res)=>{
  
})



module.exports = server;

