const express = require('express');

const server = express();

server.use(express.json());

//const games =[];

let games =[
{
  id: 1,	
  title: 'Pacman', // required
  genre: 'Arcade', // required
  releaseYear: 1980 // not required
}


];


let count =2;

server.get('/', (req, res) => {
	res.status(200).json(games);
});

server.post('/games', (req, res) => {
	
	const {title, genre, releaseYear} = req.body;
	const game = {title, genre, releaseYear, id: count};
	
	console.log(game);
	
	let gamesD = games;

	let duplicateTitle = gamesD.filter(item => {
		if(item.title === title) {
			return item;
		}	
	});

	console.log(duplicateTitle);

	if(!title || !genre) {
		res.status(422).json({error: "Title and Genre fields are required for the game"});
	}



	else if(duplicateTitle.length ===0) {
		games.push(game);
		count+=1;

		console.log(games);
		res.status(200).json({message: "Successfuly added a new game"});
	}

	else{
                 res.status(405).json({error: "Duplicate title, not allowed"});
        }

});



module.exports = server;
