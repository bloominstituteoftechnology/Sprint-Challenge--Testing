const express = require('express');

const server = express();

server.use(express.json());

let games = [
  {
    title: "Pacman",
    genre: "Arcade",
    releaseYear: 1980
  }
];

server.get('/', (req, res) => {
  res.json({message: 'Server check' });
});

server.get('/games', (req, res) => {
  
})

server.post('/games', (req, res) => {

})


module.exports = server;