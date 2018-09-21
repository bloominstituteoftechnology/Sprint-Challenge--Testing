const express = require('express');
const server = express();

const gamesArray = [
    {   
        id: 1,
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
    },
    {
        id: 2,
        title: 'Digdug', // required
        genre: 'Arcade', // required
        releaseYear: 1984 // not required
    },
    {
        id: 3,
        title: 'Tetris', // required
        genre: 'Arcade', // required
    }
];

server.use(express.json())

server.get('/' , (req, res) => {
    res.status(200).send('is running');
});

server.get('/games', (req, res) => {
    res.status(200).send(gamesArray);
})

server.get('/games/:id', (req, res) => {
    const { id } = req.params
    console.log(id)
    let single = gamesArray.find(game => {
        if (game.id == id) {
            console.log(game)
            return game;
        } 
    })

    console.log(single)
    res.status(200).send(single);
})

server.post('/games', (req, res) => {
    const newTitle = req.body.title;
    const newGenre = req.body.genre;
    const titleArr = gamesArray.map(game => {
        return game.title
    })
    if (newTitle && newGenre) {
        if (titleArr.includes(newTitle)){
            res.status(405).end()
        } else {
            id = gamesArray[gamesArray.length-1].id + 1;
            req.body.id = id;
            const { body } = req.body
            gamesArray.unshift(body)
            res.status(201).json(body)
        }
    } else if (!newTitle || !newGenre) {
        res.status(422).end();
    } else {
        res.status(500).end();
    }
});

module.exports = server;
//module.export__S__ - wont forget the s again


// const expectedRes = [
//     {   
//         id: 1,
//         title: 'Pacman', // required
//         genre: 'Arcade', // required
//         releaseYear: 1980 // not required
//     },
//     {
//         id: 2,
//         title: 'Digdug', // required
//         genre: 'Arcade', // required
//         releaseYear: 1984 // not required
//     },
//     {
//         id: 3,
//         title: 'Tetris', // required
//         genre: 'Arcade', // required
//     }
// ]