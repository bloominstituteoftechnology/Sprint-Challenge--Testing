const express = require("express");

const server = express();

server.use(express.json());

let gamesArray = [
  { title: "madden", genre: "console", year: "every", id: 1 },
  { title: "halo", genre: "console", year: "2000?", id: 2 }
];

server.get("/", (req, res) => {
  res.send("Its alive! ITS ALIVE!");
});

server.post("/games", (req, res) => {
  const { title, genre, year } = req.body;
  const titles = [];

  const addTitles = () => {
    for (let i = 0; i < gamesArray.length; i++) {
      titles.push(gamesArray[i].title);
    }
  };
  addTitles();

  console.log(titles);
  if (titles.includes(title)) {
    res.status(405).send("Game is already in database");
  } else if (title && genre) {
    res.status(201).send(`${title} added to game database`);
  } else {
    res.status(422).send("Required game fields missing");
  }
});

server.get("/games", (req, res) => {
  res.status(200).send(gamesArray);
});


server.delete("/games/:id", (req, res) => {
  const { id } = req.body;
  const ids = [];

  const addIds = () => {
    for (let i = 0; i < gamesArray.length; i++) {
      ids.push(gamesArray[i].id);
    }
  };
  addIds();

  if (ids.includes(id)) {
    res.status(200).send("Game has been deleted");
  } else {
    res.status(404).send(req.id);
  }
});

// server.get("/games/:id", (req, res) => {
//   const { id } = req.body;

//   const game = {};

//   const findGame = () => {
//     for (let i = 0; i < gamesArray.length; i++) {
//       if (gamesArray[i].id === id) {
//         game.title = gameArray[i].title
//         game.title = gameArray[i].genre
//         game.title = gameArray[i].year
//         game.title = gameArray[i].id
//       }
//     }
//   };
//   findGame();
// console.log(game);
//   if (game) {
//     res.status(200).send({title: game.title, genre: game.genre, year: game.year, id:game.id} );
//   } else {
//     res.status(404).send("A game with that id does not exists");
//   }
// });


module.exports = server;
