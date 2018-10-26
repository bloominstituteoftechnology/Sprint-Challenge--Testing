const express = require('express');
const server = express();

server.use(express.json());

const test = []

server.get('/games', (req, res) => {
  res.status(200).json({ message: 'server up' });
});

server.post('/games', (req, res) => {
  const { title, genre } = req.body;
//   const { genre } = req.body;
//   let game = {title, genre}
let addgame = req.body
  
    if (!title || !genre) {
        res.status(422).json({err, Error:'Name and Genre are required, please fill them out scrub.'})
    } else {
        test.push(addgame);
        res.status(200).json({test});
    }
});

//code acting funny

module.exports = server;

// res.status(200).json({ Games: `${title} ${genre}` });
// get an empty array []
// put the games into an array 
// there should be a push test.push(game).
// add a few games. 
// cannot be game={title, genre} because what you call !game its calling it twice. 
// addingAGame = req.body
// game.genre is already in the req.
// call title and genre