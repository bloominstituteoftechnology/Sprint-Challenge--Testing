const express = require('express');
const server = express();

server.use(express.json());

const test = []

server.get('/games', (req, res) => {
  res.status(200).json({ message: 'server up' });
});

server.post('/games', (req, res) => {
  const { title } = req.body;
  const { genre } = req.body;
  let game = {title, genre}
  
    if (!game.genre || !game.title) {
        res.status(422).json({err, Error:'Name and Genre are required, please fill them out scrub.'})
    } else {
        res.status(200).json({test});
    }
});

module.exports = server;

// res.status(200).json({ Games: `${title} ${genre}` });
// get an empty array []
// put the games into an array 