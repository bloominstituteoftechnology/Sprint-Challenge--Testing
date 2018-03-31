const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const Game = require('./models');

const server = express();
server.use(bodyParser.json());
server.use(morgan('combined'));

const STATUS_OK = 200;
const STATUS_UNPROCESSABLE = 422;
const STATUS_SERVER_ERROR = 500;

server.post('/api/game/create', (req, res) => {
  const { title, releaseDate, genre } = req.body;
  const myGame = new Game({ title, releaseDate, genre });
  myGame
    .save()
    .then(game => {
      res.status(STATUS_OK).json(game);
    })
    .catch(err => {
      res.status(STATUS_UNPROCESSABLE).json({ error: 'Error saving data to the DB', message: err });
    });
});

server.get('/api/game/get', (req, res) => {
  Game.find({}, (err, games) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR).json({ error: 'Something really bad happened' });
      return;
    }
    res.status(STATUS_OK).json(games);
  });
});

server.put('/api/game/update', (req, res) => {
  // All I care about is the game title and id.. don't worry about genre or date.
  const { title, id } = req.body;
  if (!title || !id) {
    return res.status(STATUS_UNPROCESSABLE).json({ error: 'Must Provide a title && Id' });
  }
  Game.findById(id, (err, game) => {
    if (err || game === null) {
      res.status(STATUS_UNPROCESSABLE).json({ error: 'Cannot find game by that id' });
      return;
    }
    game.title = title;
    game.save((saveErr, savedGame) => {
      if (err || game === null) {
        res.status(STATUS_SERVER_ERROR).json({ error: 'Something really bad happened' });
        return;
      }
      res.status(STATUS_OK).json(game);
    });
  });
});

server.delete('/api/game/destroy/:id', (req, res) => {
  // to delete a game you can send up an id on the request body or the params
  let id = undefined;
  if (req.params.id) {
    // if it's on the params set it.
    id = req.params.id;
  }
  if (req.body.id) {
    // if it's on the body set it.
    id = req.body.id;
  }
  if (id === undefined) {
    // if it's undefined throw error back to client
    res.status(STATUS_UNPROCESSABLE).json({ error: 'You need to give me an ID' });
    return;
  }
  Game.findByIdAndRemove(id, (err, removedGame) => {
    // search for game by that id and remove it
    if (err) {
      res.status(STATUS_UNPROCESSABLE).json({ error: 'Cannot find game by that id' });
      return;
    }
    res.status(STATUS_OK).json({ success: `${removedGame.title} was removed from the DB` });
  });
});

module.exports = server;
