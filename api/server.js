let data = [
    {
        "title": "Pacman",
        "genre": "Arcade",
        "releaseYear": 1980,
        "id": 0
    },
    {
        "title": "NFL Blitz",
        "genre": "Personal Console",
        "releaseYear": 2000,
        "id": 1
    },
    {
        "title": "Settlers of Catan",
        "genre": "Board",
        "releaseYear": 1995,
        "id": 2
    }
];

function unique(title) {
for(i=0; i<data.length; i++) {
    if(title === data[i].title) {
    return false;
    }
}
return true;
}

let newId = data.length;

const express = require('express');

const server = express();

server.use(express.json());

server.get('/games', (req, res) => {
  res.status(200).json(data); 
});

server.post('/games', (req, res) => {
    const { title, genre, releaseYear } = req.body;
    if(!title && !genre && !releaseYear) {
        res.status(422).json({ error: 'Send request with proper object structure and key value pairs' });
    } else {
        const newUser = { title, genre, releaseYear, "id": newId };
        
        if(!unique(newUser.title)) {
            res.status(405).json({ error: 'Title of game is not unique to database' });
        } else {
            data = [...data, newUser];
            res.status(201).json({newUser});
        }
    };
})

module.exports = server; 