const express = require('express'); 

const server = express(); 
server.use(express.json())

let id = 4; 
const games = [
    { id: 1, title: "Pacman", genre: "Arcade", releaseYear: 1980 },
    { id: 2, title: "Fortnite", genre: "Battle Royale", releaseYear: 2017 },
    { id: 3, title: "Assassins Creed", genre: "Action", releaseYear: 2017 },
    { id: 4, title: "Mario Cart", genre: "Kids Wii Gaming", releaseYear: 2000 }
  ];


server.get("/games", (req, res) => {
    if(games.length > 0){
        res.status(200).json(games); 
    }else{
        res.status(200).json([]); 
    }
})

server.post("/games", (req, res) => {
    const { title, genre } = req.body;
  
    if (!title || !genre) {
        return res.status(422).json({error: "Please enter valid request body requirements: id, title, genre"});
    } 

    const matching = games.filter(game => game.title === title); 
    if(matching.length > 0){
        return res.status(405).json({error: "Game already exists"})
    }
    id += 1; 
    req.body.id = id;  
    games.push(req.body)
    res.status(201).json(req.body);
  });


module.exports = server; 