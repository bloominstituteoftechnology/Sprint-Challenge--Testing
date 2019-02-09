const express = require('express');
const router = express.Router();
const data = require('../data');

const server = express();
server.use(express.json());

const GAMES_GET_ENDPOINT = '/games';
const GAMES_POST_ENDPOINT = '/games';

server.get('/', (req, res) => {
    res.status(200).json({ api: 'active' });
});

server.get(GAMES_GET_ENDPOINT, (req, res) => {

});

server.post(GAMES_POST_ENDPOINT, (req, res) => {
    const game = req.body;
    if (game.title && game.genre) {
      const id = data.add(game);
      res.status(201).json({id});
    } else {
      res.status(422).json({error: 'Missing title or genre'});
    }

});

module.exports = server;