const express = require("express");
const port = process.env.PORT || 3334;

const server = express();
server.use(express.json());

let games = [
  { title: "Help Ryan Study", genre: "Platformer", releaseYear: 2018 },
  { title: "Mario Teaches Typing", genre: "Educational", releaseYear: 1991 }
];

server.get("/", (req, res) => {
  res.status(200).json({ api: "is up" });
});

server.get('/games', (req, res) =>{
    res.status(200).json(games)
})

server.post('/games', (req, res) =>{
    let {title, genre, releaseYear} = req.body;
    if (games.some(game => game.title === title)){
        return res.status(405).json('Game data already exists')
    }
    if (!title || !genre || !releaseYear){
        return res.status(422).json('Title, genre and release year required')
    }
    let before = games.length;
    games.push({...req.body})
    let after = games.length;
    if(after > before){
        return res.status(201).json('Game added')
    }
    return res.status(500).json('game not added')
})

server.listen(port, `we hear you ${port}`);

module.exports = server;
