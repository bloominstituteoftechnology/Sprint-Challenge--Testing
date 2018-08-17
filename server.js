const express = require('express');
const server = express();

server.use(express.json());

const games = [{
    title: 'Pacman',
    genre: 'Arcade',
    releaseYear: 1980
  },
  {
    title: 'ET',
    genre: 'Terrible',
    releaseYear: 1981
  },
  {
    title: 'Contra',
    genre: 'Shoot \'em Up',
    releaseYear: 1985
  }
]

server.get('/', (req, res) => {
  res.status(200).json({
    api: 'Running'
  });
});

server.get('/games', (req, res) => {
  res.status(200).json(games);
});

server.post('/games', (req, res) => {
  let notUnique = false;
  for (let i = 0; i < games.length; i++) {
    if (games[i]['title'] === req.body.title) {
      notUnique = true;
      break;
    }
  }
  if (req.body.title && req.body.genre && !notUnique) {
    games.push(req.body);
    res.status(201).json({
      success: true
    });
  } else if (notUnique) {
    return res.status(405).send('Game with that title already exists in database');
  } else {
    res.status(422).send('Error');
  }

})



module.exports = server;