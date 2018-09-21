const express = require('express'); 

const server = express(); 

const games = [
    { id: "1", title: "Pacman", genre: "Arcade", releaseYear: 1980 },
    { id: "2", title: "Fortnite", genre: "Battle Royale", releaseYear: 2017 },
    { id: "3", title: "Assassins Creed", genre: "Action", releaseYear: 2017 },
    { id: "4", title: "Mario Cart", genre: "Kids Wii Gaming", releaseYear: 2000 }
  ];

server.get("/games", (req, res) => {
    res.status(200).json(games); 
})


module.exports = server; 