const express = require("express");
const router = express.Router();
const dbModel = require("./gameModel");

router.get("/", (req, res) => {
  dbModel.find().then(table => {
    res.status(200).json(table);
  });
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  dbModel
    .findById(id)
    .then(game => {
      if (!game) return res.status(404).json({ err: "ID not found" });
      res.status(200).json(game);
    })
    .catch(() => {
      res.status(404).json({ err: "ID not found" });
    });
});

router.post("/", (req, res) => {
  const { title, genre, releaseYear } = req.body;

  if (!title || !genre)
    return res.status(422).json({ err: "Missing required field" });
  dbModel
    .addGame({ title, genre, releaseYear })
    .then(id => {
      res.status(201).json(id[0]);
    })
    .catch(err => {
      res.status(405).json({ err: "title already in database" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  dbModel
    .remove(id)
    .then(deleted => {
      if (deleted < 1) return res.status(404).json({ err: "ID not found" });
      res.status(200).json(deleted);
    })
    .catch(() => {
      res.status(404).json(err);
    });
});

module.exports = router;
