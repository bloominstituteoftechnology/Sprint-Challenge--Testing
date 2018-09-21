const express = require("express");
const app = express();
let store = [];

app.use(express.json());

app.post("/games", (req, res) => {
  if (!req.body.title || !req.body.genre) {
    res.status(422).json({ errorMessage: "Invalid body" });
    return;
  }

  if (!req.body.releaseYear) {
    req.body.releaseYear = 0;
  }
  store.push({
    title: req.body.title,
    genre: req.body.genre,
    releaseYear: req.body.releaseYear
  });

  res.status(200).json(store);
  return;
});

app.use("/", (req, res) =>
  res
    .status(404)
    .json({ errorMessage: "You probably want to use a different endpoint" })
);

module.exports = app;
