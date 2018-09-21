const express = require("express");

const server = express();

server.use(express.json());

const gamesArr = [];

// server.post("/games", (req, res) => {
//   const game = req.body;

//   db.insert(user)
//     .into("users")
//     .then(id => {
//       res.status(201).json(id);
//     })
//     .catch(err => {
//       console.log("error", err);
//       res.status(500).json({
//         error: "There was an error saving the user to the database."
//       });
//     });
// });

server.post("/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (title && genre && releaseYear) {
      gamesArr.push(req.body);
      console.log(gamesArr)
    res.status(200).json({ Added: `${title} ${genre} ${releaseYear}` });
  } else {
    res.status(422).json({ message: "missing information" });
  }
});

module.exports = {
    server,
  };