const express = require("express");
const server = express();
const port = process.env.PORT || 9999;
 
server.use(express.json());

let games = [{
    title: "Psychonauts",
    genre: "Platform",
    releaseYear: 2005
  },
  {
    title: "Psychonauts 2",
    genre: "Platform",
    releaseYear: 2019
  }
];

server.get('/', (req, res) => {
  res.status(200).json(games)
})

server.post('/', (req, res) => {
  const data = req.body
  if (data.title && data.genre) {
    if (!games.includes(data.title)) {
      games.push(data)
      res.status(201).json(games.length)
    } else {
      res.status(405).json({
        message: 'duplicate'
      })
    }
  } else {
    res.status(422).json({
      message: 'no data'
    })
  }
})


server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));

module.exports = server; 