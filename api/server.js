const express = require('express');;

const server = express();

server.use(express.json());
//store games in memory
let games = [];
//keep track of game ids
let gameId = 1 ;

//sanity check
server.get('/', (req, res) => {
  res.status(200).json({ message: 'it\'s ALIVE!' })
})
//get all games endpoint
server.get('/games', (req, res) => {
  res.status(200).json(games);
});
//get specific game endpoint
server.get('/games/:id', (req, res) => {
  const { id } = req.params;
  let game = [];
  const gameExists = games.find(game => game.id == id);
  if (gameExists) {
    game.push(gameExists);
    res.status(200).json(game);
  } else {
    res.status(404).json({ error: 'A game with that id does not exist'})
  }
});
//delete specified id endpoint
server.delete('/games/:id', (req, res) => {
  const { id } = req.params;
  const gameExists = games.find(game => game.id == id);
  if (gameExists) {
    const removedGame = { ...gameExists };
    //filter the games by returning only those with a different id
    games = games.filter(game => {
      game.id != id;
    })
  res.status(204).json(games);

  } else {
    res.status(404).json({ error: 'A game with that id does not exist'})
  }
});
//add new game to list endpoint
server.post('/games', (req, res) => {
  const { title, genre, releaseYear } = req.body;
  const newGame = { title, genre, releaseYear, id: gameId };
  if (!title || !genre) {
    return res.status(422).json({ error: 'title and genre are required' });
  }
  const findGameByTitle = game => {
    return game.title === title;
  };
  if (games.find(findGameByTitle)) {
    return res.status(405).json({ error: 'That title already exists!' })
  }
  games.push(newGame);
  gameId++;
  res.status(201).json(games);
})

module.exports = server;
