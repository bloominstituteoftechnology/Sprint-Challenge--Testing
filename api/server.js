const express = require('express');

const server = express();

server.use(express.json());

let games = [

];

server.get('/', (req, res) => {
  res.json({message: 'Server check' });
});

server.get('/games', (req, res) => {
  res.status(200).json(games);
})

server.post('/games', (req, res) => {

})


module.exports = server;