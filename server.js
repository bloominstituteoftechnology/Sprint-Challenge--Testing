const express = require('express');

const server = express();

server.use(express.json());

let gamesList = [
  // {
  //   name: 'Spider-Man',
  //   yearRelease: 2018,
  //   genre: 'action-adventure',
  // },
  // {
  //   name: 'Fallout 4',
  //   yearRelease: 2017,
  //   genre: 'action, role-playing',
  // },
  // {
  //   name: "PLAYERUNKOWN'S Battlegrounds",
  //   yearRelease: 2017,
  //   genre: 'Action',
  // },
  // {
  //   name: 'Minecraft',
  //   yearRelease: 2009,
  //   genre: 'sandBox, survival Game',
  // },
  // {
  //   name: 'Grand Theft Auto V',
  //   yearRelease: 2013,
  //   genre: 'action-adventure',
  // },
  // {
  //   name: 'Portal',
  //   yearRelease: 2007,
  //   genre: 'platform, puzzle',
  // },
];

server.get('/games', (req, res) => {
  if (!gamesList.length) {
    res.status(200).json({ games: [] });
  } else {
    res.status(200).json({ games: gamesList });
  }
});

module.exports = server;
