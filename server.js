const express = require("express");
const app = express();
let store = [];
let currentID = 0;

app.use(express.json());

app.post("/games", (req, res) => {
  if (!req.body.title || !req.body.genre) {
    res.status(422).json({ errorMessage: "Invalid body" });
    return;
  }
  store.forEach(e => {
    if (e.title === req.body.title) {
      res.status(405).json({ errorMessage: "Duplicate title" });
      return;
    }
  });
  if (!req.body.releaseYear) {
    req.body.releaseYear = 0;
  }
  store.push({
    id: currentID,
    title: req.body.title,
    genre: req.body.genre,
    releaseYear: req.body.releaseYear
  });
  currentID++;
  res.status(200).json(store);
  return;
});

app.get("/games", (req, res) => {
  res.status(200).json(store);
  return;
});
app.get("/games/:id", (req, res) => {
  store.forEach(element => {
    if (element.id == req.params.id){
      res.status(200).json([element]);
      return;
    }
  });
  res.status(404).json({errorMessage:'ID not found'});
  return;
});
app.get("/reset", (req, res) => {
  store = [];
  currentID = 0;
  res.status(200).json({ message: "success" });
  return;
});
app.use("/", (req, res) =>
  res
    .status(404)
    .json({ errorMessage: "You probably want to use a different endpoint" })
);

module.exports = app;
