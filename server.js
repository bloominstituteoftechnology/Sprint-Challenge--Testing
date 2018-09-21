const express = require('express'); 

const server = express(); 
server.use(express.json())

const games = [
    { id: "1", title: "Pacman", genre: "Arcade", releaseYear: 1980 },
    { id: "2", title: "Fortnite", genre: "Battle Royale", releaseYear: 2017 },
    { id: "3", title: "Assassins Creed", genre: "Action", releaseYear: 2017 },
    { id: "4", title: "Mario Cart", genre: "Kids Wii Gaming", releaseYear: 2000 }
  ];

server.get("/games", (req, res) => {
    if(games.length > 0){
        res.status(200).json(games); 
    }else{
        res.status(200).json([]); 
    }
})

server.post("/games", (req, res) => {
    const { id, title, genre } = req.body;
  
    if (!id || !title || !genre) {
      res.status(422).end();
    } else {
      res.status(201).json(req.body);
    }
  });


module.exports = server; 