let data = [
    {
        "title": "Pacman",
        "genre": "Arcade",
        "releaseYear": 2421,
        "id": 0
    },
    {
        "title": "UNO",
        "genre": "Card",
        "releaseYear": 1774,
        "id": 1
    },
    {
        "title": "Street Fighter",
        "genre": "Arcade",
        "releaseYear": 1492,
        "id": 2
    }
];

function unique(title) {
    for(let i= 0; i<data.length; i++) {
        if(title === data[i].title) {
        return false;
        }
    }
    return true;
};

function findGame(id) {
    const game = data.find(game => game.id === id);
    if(!game) {
        return false;
    } else {
        return game; 
    }
}

let newId = 3;

const express = require('express');

const server = express();

server.use(express.json());

server.get('/games', (req, res) => {
  res.status(200).json(data); 
});

server.get('/games/:id', (req, res) => {
    const id = req.params.id;
    const game = findGame(Number(id));
    if(!game) {
        res.status(404).json({ error: 'No game found by that id' });
    } else {
        res.status(200).json(game);
    }
})

server.post('/games', (req, res) => {
    const { title, genre, releaseYear } = req.body;
    if(!title && !genre && !releaseYear) {
        res.status(422).json({ error: 'send request with proper body' });
    } else {
        const newUser = { title, genre, releaseYear, "id": newId };
        
        if(!unique(newUser.title)) {
            res.status(405).json({ error: 'Need a unique title' });
        } else {
            data = [...data, newUser];
            res.status(201).json({newUser});
            newId++; 
        }
    };
})

module.exports = server; 