const express = require('express');

const router = express.Router();

let games = [
  {
    title: 'Pacman', // required
    genre: 'Arcade', // required
    releaseYear: 1980, // not required
  },
  {
    title: 'Snake', // required
    genre: 'Arcade', // required
  },
];

router.get('', (req, res) => {
  res.status(200).json(games);
});

router.post('', (req, res) => {
  const { title, genre, releaseYear } = req.body;
  const game = { title, genre, releaseYear };
  if (!game.title || !game.genre) {
    res.status(422).json({ message: 'Title and genre are required fields' });
  } else {
    games.push(game);
    res.status(201).json({ message: 'Game added' });
  }
});

module.exports = router;
