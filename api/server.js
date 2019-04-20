const express = require('express');
const server = express();

server.use(express.json())

let gameArray = [
    {
        title: 'Pacman', 
        genre: 'Arcade', 
        releaseYear: 1980 
    },
    {
        title: 'Shadow of Colossus',
        genre: 'Action-Adventure', 
        releaseYear: 2005 
    }
]

function checker(req,res,next){
    let {title, genre} = req.body;

    if(title && genre){
        next()
    }
    else{
        res.status(422).json({message: 'No bueno.'})
    }
}

server.post('/games', checker, (req, res)=>{
    
    let newGameArr = gameArray.push(req.body);

    res.status(200).json(newGameArr)
});


 server.get('/games', (req, res)=>{
    res.status(200).json(gameArray)
});

module.exports = server