const express = require("express");

const server = express();
server.use(express.json());

const sendUserError = (msg, res) => {
  res.status(422);
  res.json({ Error: msg });
  return;
};

let games = [
  {
    title: "Pacman",
    genre: "Arcade",
    releaseYear: "1980"
  }
];

server.get("/games", (req, res) => {
  res.json(games);
});

server.post("/games", (req, res) => {
  const { title, genre, year } = req.body;
  const newGame = { title, genre, year };
  if (!title || !genre) {
    return sendUserError(
      "Game Over Man! A game needs a title and genre to enter the database",
      res
    );
  }
  const findGameByTitle = game => {
    return game.title === title;
  };
  if (games.find(findGameByTitle)) {
    res.status(405);
    res.json({
      Error: `Game over man! ${title} already exists in the game DB.`
    });
    return res;
  }
  games.push(newGame);
  res.json(games);
});

module.exports = server;
