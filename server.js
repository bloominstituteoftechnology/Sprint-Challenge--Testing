const express = require('express');
const server = express();

server.use(express.json());

const games = [{
    id:0,
    title: 'Pacman',
    genre: 'Arcade',
    releaseYear: 1980
  },
  {
    id:1,
    title: 'ET',
    genre: 'Terrible',
    releaseYear: 1981
  },
  {
    id:2,
    title: 'Contra',
    genre: 'Shoot \'em Up',
    releaseYear: 1985
  }
];

//This is used in the post request to /games to start the incrementing
let gameId = 3;

server.get('/', (req, res) => {
  res.status(200).json({
    api: 'Running'
  });
});

server.get('/games', (req, res) => {
  res.status(200).json(games);
});

server.get('/games/:id', (req, res) => {
  if (games[req.params.id]) {
    return res.status(200).json(games[req.params.id])
  } else {
    return res.status(404).send('404: Not found');
  }

})

server.post('/games', (req, res) => {
  const newGame = req.body
  newGame.id = gameId;
  if (!(newGame.title && newGame.genre)) {
    return res.status(422).send('Need title and genre');
  }
  let notUnique = false;
  for (let i = 0; i < games.length; i++) {
    if (games[i]['title'] === req.body.title) {
      notUnique = true;
      break;
    }
  }

  if (newGame.title && newGame.genre && !notUnique) {
    games.push(newGame);
    res.status(201).json({
      success: true
    });
    gameId++;
  } else if (notUnique) {
    return res.status(405).send('Game with that title already exists in database');
  } else {
    res.status(422).send('Error');
  }

})



module.exports = server;

// Server listening down here to test requests on the server
// server.listen(9000, () => console.log('App is running'))
