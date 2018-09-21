const express = require("express");

const server = express();

server.use(express.json());

const gamesArr = [];

let count = 0;

server.post("/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title || !genre) {
    res.status(422).json({ message: "missing information" });
  }
  //   else if (gamesArr.filter(game => game.title === title).length > 0) {
  //     res.status(405).json({ message: "title already exists" });
  //   }
  else {
    req.body.id = count++;
    gamesArr.push(req.body);
    res.status(200).json({ Added: `${title} ${genre} ${releaseYear}` });
  }
});

server.get("/games", (req, res) => {
  res.status(200).json(gamesArr);
});

server.delete("/games/:id", (req, res) => {
  const { id } = req.params;
  const found = gamesArr.find(game => game.id == id);
  for (let i = 0; i< gamesArr.length; i++) {
      if (gamesArr[i].id === found.id) {
          gamesArr.splice(i, 1);
      }
  }
  //   gamesArr = gamesArr.filter(game => game.id !== parseInt(id));
  //use .find
  res.status(200).json(gamesArr);
});

server.get("/games/:id", (req, res) => {
  //const found = gamesArr.find(game => game.id == id)
  //if !found, return null
  res.status(200).json(gamesArr);
});

module.exports = {
  server,
  gamesArr
};
