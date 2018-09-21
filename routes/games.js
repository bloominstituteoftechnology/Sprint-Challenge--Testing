const express = require("express");
const router = express.Router();

let gameStore = [
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

router.get("/:id", (req, res, next) => {
  const game = gameStore.find(game => game.id === Number(req.params.id));
  game === undefined
    ? res.status(404).send("Not Allowed")
    : res.status(200).json({ status: true, game });
});

router.post("/", (req, res, next) => {
  gameStore.map(
    game =>
      game.title === req.body.title ? res.status(404).send("Not Allowed") : null
  );
  gameStore.push(req.body);
  res.status(200).json({
    status: true,
    updatedGames: gameStore
  });
});

router.delete("/:id", (req, res, next) => {
  const prev = gameStore.length;
  gameStore = gameStore
    .filter(game => game.id !== Number(req.params.id))
    .map(game => game);

  prev > gameStore.length
    ? res.status(200).json({ status: true, games: gameStore })
    : res.status(404).send("Not Allowed");
});

module.exports = router;
