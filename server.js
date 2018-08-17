const express = require('express');
const server = express();
server.use(express.json());

const data = [
  {
    name: 'pac-man',
    genre: 'arcade',
    year: '1980'
  }
]


server.get('/games', (req, res)=>{
  res.status(200).json(data) 
})

server.post('/games', (req, res) =>{
  const {name, genre, year} = req.body;
  const newGame = {name, genre, year}
  if (!newGame.genre || !newGame.name) {
    res.status(422).json({"error": "missing required information"})
  }
  //filters test data, to test if game exists (includes regex variables to strip out all special characters except numbers) if game exists, sends 405 error.

  const newData = data.slice();
  newData.filter(gamedata => {
    var noSpecialsData = gamedata.name.replace(/[^\w\s]/gi, "");
    var noSpecialsName = newGame.name.replace(/[^\w\s]/gi, "");
    if (gamedata.name === name || noSpecialsData === noSpecialsName) {
      res.status(405).json({"error": "Game Already Exists."})
    }
  })

  
  res.status(201).json(newGame) 
})





module.exports = server;