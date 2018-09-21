const express = require("express");
const server = express();

const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./dbConfig.js");

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(morgan("short"));

server.get("/", (req, res) => {
  res.status(200).send("Server Up and running");
});

server.get("/games", (req, res) => {
  db("games")
    .then(games => {
      res.status(200).json(games);
    })
    .catch(error => {
      res.status(500).json({ error, message: "Unable to obtain games." });
    });
});

function postChecker (req, res, next) {
  if(!req.body.genre || !req.body.title){
    res.status(422).json({errorMessage: "genre and title required"});
  } else {
      next()
  }
}
function unique (req, res, next){
  db("games")
    .then(games => {
       const uniqueTitle = games.filter((game) => game.title === req.body.title)
       if(uniqueTitle.length){
          res.status(405).json({errorMessage: "Game not unique"})
       } else {
          next()
       }
    })
}

server.post("/games", postChecker, unique, (req, res) => {
  db("games")
    .insert(req.body)
    .then(gameId => {
      const id = gameId[0]
      res.status(201).json(id);
    })
    .catch(error => {
    //   if(error.message.includes('UNIQUE constraint failed')){
    //     res.status(405).json({errorMessage: "the title being added must be unique"})
    //   } else {
    //     res.status(500).json({error, message: error.message});
    //   } 
      res.status(500).json({error}) 
    });
});


module.exports = server;
