const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hi Besssie!');
})

const games = []; // created games array

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

module.exports = server;