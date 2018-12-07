const express = require('express');

const server = express();

server.use(express.json());


const games = [
    {
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
      },
      {
        title: 'Contra', // required
        genre: 'Arcade', // required
        releaseYear: 1981 // not required
      },
      {
        title: 'Commando', // required
        genre: 'Arcade', // required
        releaseYear: 1982 // not required
      }
];


server.get('/', (req, res) => {
    res.status(200).json({ message: 'server is up' });
});

server.post('/games', (req, res) => {
    const { title, genre, releaseYear} = req.body;

    if(!title || !genre){
        res.status(422).json({message:`Both title and genre are required`});
    } else{
    res.status(200).json(games)};
})



module.exports = server;