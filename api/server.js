
const express = require('express');

const server = express();

const db = require('../data/dbConfig.js');

server.use(express.json())

server.get('/', (req, res) =>{
  res.status(200).json({ api: "up" })
});
server.get('/games', (req, res) =>{
  db('games')
    .select('id', 'title', 'genre', 'releaseYear')
    .then(games => res.status(200).json(games))
    .catch(err => res.send(err));  
});

server.post("/games", (req, res) => {
  const {title, genre, releaseYear} = req.body;
  if(!req.body.title || !req.body.genre){
		res.status(422).json({msg: 'please include both title and genre'})
	} else {
  db.insert({title, genre, releaseYear}).into('games')
		.then(response => {
			res.status(201).json(response)
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({msg: 'There was an error creating game'})
		})
	}
});

server.delete('/api/games/:gameId', (req, res) => {
  const { gameId } = req.params;

  db('games')
    .where({ id: gameId })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = server;