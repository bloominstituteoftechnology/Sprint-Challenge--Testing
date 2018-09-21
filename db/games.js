const games = [
  {
    id: "0",
    title: "Pacman",
    genre: "Arcade",
    releaseYear: 1980,
  },
  {
    id: "1",
    title: "Skyrim",
    genre: "Console",
    releaseYear: 2010,
  },
  {
    id: "2",
    title: "Pokemon",
    genre: "Handheld",
    releaseYear: 1995,
  },
];

const newGame = {
  id: "100",
  title: "Risk",
  genre: "Board Game",
  releaseYear: 1965,
};

const errMessage = { message: "game not found" };

module.exports = {
  games,
  newGame,
  errMessage,
};
