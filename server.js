const express = require('express');

const server = express();

server.use(express.json());

//const games =[];

const games =[
{
  title: 'Pacman', // required
  genre: 'Arcade', // required
  releaseYear: 1980 // not required
}


];



server.get('/', (req, res) => {

	res.status(200).json(games);
});









module.exports = server;
