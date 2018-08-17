// import dependencies
const express = require('express');

// declare the server
const server = express();

// apply middleware
server.use(express.json());

// placeholder for array of games in memory
let games = [];

// establish GET endpoint
server.get('/games', (req, res) => {
  res
    .status(200)
    .json(games);
})

// establish POST endpoit
server.post('/games', (req, res) => {
  let game = req.body;
  if (!(game.title || game.genre)) {
    res
      .status(422)
      .end();
  } else {
    games.push(game);
    res
      .status(201)
      .end();
  }
})

// export server so tests can interact with it
module.exports = server;