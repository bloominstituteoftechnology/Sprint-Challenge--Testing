const express = require('express');
const helmet = require('helmet');
const server = express();
// const router = express.Router();

server.use(express.json());
server.use(helmet());

let games = {
  title: 'Pacman',
  genre: 'Arcade',
  releaseYear: 1980
};

// router.route('/games')
//   .get((req, res) => {
//     res.status(200).json(games);
//   })

server.get('/games', (req, res) => {
  res.status(200).json(games);
})



module.exports = server;
