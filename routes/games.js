const express = require("express");
const router = express.Router();

const gameStore = [
  {
    id: 1,
    title: "Pacman",
    genre: "Arcade",
    releaseYear: 1978
  },
  {
    id: 2,
    title: "Space Invader",
    genre: "Shooter Game",
    releaseYear: 1980
  },
  {
    id: 3,
    title: "Gravitar",
    genre: "Arcade",
    releaseYear: 1982
  }
];

router.get("/", (req, res, next) =>
  res.status(200).json({ status: true, games: gameStore })
);

module.exports = router;
