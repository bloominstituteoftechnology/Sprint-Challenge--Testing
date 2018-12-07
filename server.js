// dependency imports
const express = require("express");

//internal imports
const db = require("./data/dbConfig");

// init server
const server = express();

// middleware
server.use(express.json());

// endpoints
// sanity
server.get("/", (req, res) => {
  res.status(200).json({ server: "running" });
});

server.post("/games", (req, res) => {
  const game = req.body;

  if (!game.title || !game.genre) {
    res.status(422).json({
      message:
        "Please fill out at least title and genre fields before submitting"
    });
  } else {
    //stretch: first make sure db doesn't already contain game with the submitted name
    db("games")
      .where({ title: game.title })
      .then(dbGame => {
        if (dbGame && dbGame.length) {
          // if it already exists (check length because will still return an empty array if not), status 405 Not Allowed
          res.status(405).json({ message: "That game already exists." });
        } else {
          // otherwise allow POST request
          db("games")
            .insert(game)
            .then(id => res.status(201).json(id))
            .catch(err => res.status(500).json(err));
        }
      });
  }
});

server.get("/games", (req, res) => {
  db("games")
    .then(games => {
      res.status(200).json(games);
    })
    .catch(err => res.status(500).json(err));
});

// stretch endpoint for GET/:id
server.get("/games/:id", (req, res) => {
  const { id } = req.params;
  db("games")
    .where({ id })

    .then(game => {
      if (game && game.length) {
        res.status(200).json(game);
      } else {
        res.status(404).json({ message: "That game already exists" });
      }
    })
    .catch(err => res.status(500).json(err));
});

server.delete("/games/:id", (req, res) => {
  const { id } = req.params;
  db("games")
    .where({ id })
    .del()
    .then(count => {
      count
        ? res.status(200).json(count)
        : res.status(404).json({ message: "No game with that id exists" });
    })
    .catch(err => res.status(500).json(err));
});

const port = process.env.PORT || 6000;

module.exports = server;
