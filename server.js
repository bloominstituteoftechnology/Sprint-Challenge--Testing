// import dependencies
const express = require('express');

// declare the server
const server = express();

// apply middleware
server.use(express.json());

// establish base id
let id = 1;

// placeholder for array of games in memory
let games = [];

// increment id
const increment = () => {
  return id++;
}

// establish GET endpoint
server.get('/games', (req, res) => {
  res
    .status(200)
    .json(games)
})

// establish GET/:id endpoint
server.get('/games/:id', (req, res) => {
  let requested = Number(req.params.id);
  let found = games.find(item => {
    return item.id === requested;
  });
  if (found) {
    res
      .status(200)
      .end()
  } else {
    res
      .status(404)
      .end()
  }
})

// establish POST endpoint
server.post('/games', (req, res) => {
  let game = { id: increment(), ...req.body }
  let unique = games.find(item => {
    return item.title === game.title;
  })
  if (!(game.title || game.genre)) {
    res
      .status(422)
      .end()
  } else if (unique) {
    res
      .status(405)
      .end()
  } else {
    games.push(game);
    res
      .status(201)
      .end()
  }
})

// export server so tests can interact with it
module.exports = server;