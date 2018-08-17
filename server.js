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

server.post('/games', (req, res) => {
	
	const {title, genre, releaseYear} = req.body;
	const game = {title, genre, releaseYear};

	if(!title || !genre) {
		res.status(422).json({error: "Title and Genre fields are required for the game"});
	}	

	else {
		games.push(game);
		console.log(games);
		res.status(200).json({message: "Successfuly added a new game"});
	}

});



module.exports = server;
