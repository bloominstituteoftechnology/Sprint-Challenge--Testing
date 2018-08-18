const express = require('express');
const server = express();

server.use(express.json());
const games = [
  {
      id: 1,
      title: 'game1',
      genre: 'sports'
  },
  {
      id: 2,
      title: 'game2',
      genre: 'action'
  },
  {
      id: 3,
      title: 'game3',
      genre: 'shooter'
  }
];

server.get('/games', (req, res) => {
  res.status(200).json({ games });
});

server.post('/games', (req, res) => {
  const {id, title, genre} = req.body;
  games.forEach(game => {
    console.log (game['title'], title)
    if (game.title === title) {
      res.status(400).json({message: 'The game already exists in database'})
      return;
    }
  })

    // else if (game.title !== title) {
    //   games.push({id, title, genre })
    //   res.status(201).json(games[games.length - 1]);
    //   return;
    // } else {
    //   res.status(500).json({error: 'unable to add the game'})
    // }
});


module.exports = server;