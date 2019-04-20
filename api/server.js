const express = require("express");

const server = express();

 server.use(express.json());

 module.exports = server;

 server.get('/', async (req, res) => {
  res.status(200).json({ api: 'up' });
});

let games = [
  {
      title: 'Pacman',
      genre: 'Arcade',
      releaseYear: 1980
  },
  {
      title: 'World of Warcraft',
      genre: 'RPG',
      releaseYear: 2004
  },
  {
      title: 'Tropico 5',
      genre: 'CMS',
      releaseYear: 2014
  }
];

server.get('/games', (req, res) => {
  res.status(200)
    .json(games);
})

server.post('/games', (req, res) => {
  let {title, genre} = req.body;
  // check for required fields
  if (title && genre){
		res.status(201).json(req.body);
  }else{
    res
    .status(422)
    .json({message : "Missing Info"});
  }
});
