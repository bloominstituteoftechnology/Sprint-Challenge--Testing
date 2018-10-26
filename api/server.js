const express = require('express');
const helmet = require('helmet');
const server = express();
// const router = express.Router();

server.use(express.json());
server.use(helmet());

let games = [];

// router.route('/games')
//   .get((req, res) => {
//     res.status(200).json(games);
//   })

server.get('/games', (req, res) => {
  res.status(200).json(games);
})

server.post('/games', (req, res) => {
  const { title, genre, releaseYear }  = req.body;
  const newGame = { title, genre, releaseYear };
  if(!title || !genre) {
    return res.status(422).json({ Error: 'Please provide required info.'})
  } else {
    games.push(newGame);
    return res.status(200).json(games);
  };
})



module.exports = server;
