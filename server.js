const express = require("express");
const db = require("./data/dbConfig.js");

// initialize server
const server = express();

// Middleware
server.use(express.json());

// Endpoints

// Searching Variable

// POST call, add a new game to the database.

// res.status(405).json({message: `Titles must be unique. ${gameData.title} has already been entered into this database.`})
// 
server.post("/api/games", async (req, res) => {yarn 
  const gameData = req.body;
  if (!gameData.title || !gameData.genre || !gameData.releaseYear) {
    res
      .status(422)
      .json({message: "Please include a title, genre and release year to add a new game."});
  }

const existingRecords = await db('games')
const existingTitle = existingRecords.some(object => {return object['title'] === `${gameData['title']}`})


  if (!existingTitle) {
    db("games")
    .insert(gameData)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json({ error: `Error: ${err}` }));
  } else {
      res.status(405).json({message: `Titles must be unique. ${gameData.title} has already been entered into this database.`})
  }

 
});

// GET call, access all games from database.

server.get("/api/games/info", (req, res) => {
  db("games")
    .then(games => {
      res.status(200).json(games);
    })
    .catch(err => res.status(500).json({ error: `Error: ${err}` }));
});

server.delete('/api/games/:id/', (req, res) => {
    const {id} = req.params
    db('games')
    .where({id: Number(id)})
    .first()
    .delete()
    .then(ids => {
        console.log(ids)
        if (ids === 0) {
            res.status(404).json({message: `Sorry there is no game with the ID ${id}`})
        }
        res.status(200).json(ids)
    })
    .catch(err => {res.status(500).json({message: `error: ${err}`})})
})



// server.get("/api/games/", (req, res) => {
//   db("games")
//     .where("title", "Donkey Kong")
//     .then(game => {
//       console.log(
//         game.some(object => {
//           return object["title"] === "Donkey Kong";
//         })
//       );
//       res.json(game);
//     });
// });

// Sanity Check
server.get("/", (req, res) => {
  res.json({ api: "alive" });
});

module.exports = server;
