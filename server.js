const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hi Besssie!');
})

const games = [
    {
        id: 1,
        title: 'Tumbang Preso',
        genre: 'Traditional',
        releaseYear: 1600
    },
]; // created games array

server.post('/games', (req, res) => {
    const { title, genre, releaseYear }  = req.body;
    const newGame = { title, genre, releaseYear };
    if(!title || !genre) {
     res.status(422).json({ error: 'Please provide some of the missing information.'})
    } else {
      games.push(newGame);
      res.status(200).json({ message: `${title} ${genre} from ${releaseYear} has been added!` });
    };
  })

server.get('/games', (req, res) => {
  res.status(200).json(games);
})

server.get('/games/:id', (req, res) => {
    const { id } = req.params;
    const game = games.filter(
      theGame => Number(theGame.id) === Number(id)
    );
    if (game.length > 0) {
      res.status(200).json(game);
    } else {
      res.status(404).json({ message: 'Sorry! But the game does not exist.' });
    }
  });
  
module.exports = server;