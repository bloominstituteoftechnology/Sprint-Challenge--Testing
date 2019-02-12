const express = require("express");

const games = require("../games/gamesModel.js");

const server = express();

server.use(express.json());

// The GET /games endpoint should return the list of games and HTTP status code 200.
server.get('/games', async (req, res) => {
    await games.fetch()
        .then(rows => {
            res.status(200).json(rows)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Failed to fetch games.' });
        });
});

server.get('/games:id', async (req, res) => {
    const { id } = req.params;
    await games.fetch(id)
        .then(game => {
            if(game) {
                res.status(200).json(game)
            }
            else {
                res.status(404).json({ errorMessage: 'This game cannot be found.' })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Game info not found.' });
        });
});

server.post('/games', (req, res) => {
    const gameData = req.body;
    if(gameData.title && gameData.genre){
        games.insert(gameData)
            .then(game => {
                res.status(201).json(game);
            })
            .catch(err => {
                res.status(404).json({ errorMessage: 'Please make sure you have a unique title.' })
            })
    }

    else if(gameData.title) {
        res.status(422).json({ errorMessage: 'This game is missing a genre.' })
    }

    else if(gameData.genre) {
        res.status(422).json({ errorMessage: 'This game is missing a title.' })
    }

    else {
        res.status(422).json({ errorMessage: 'This game needs a title and a genre.' });
    };
});

// server.delete('/games/:id', (req, res) => {
//     const { id } = req.params;
//     games.remove(id)
//         .then(game => {
//             res.json(game);
//         })
//         .catch(err => {
//             res.status(404).json({ errorMessage: 'Failed to delete game.'});
//         });
// });
// // Write a test to make sure this endpoint always returns an array, even if there are no games stored. If there are no 
// // games to return, the endpoint should return an empty array.

// // In the route handler, validate that the required fields are included inside the body. If the information is incomplete, return a 422 status code.

// // Write a GET /games/:id endpoint that returns the information about a single game. Respond with a 404 status code 
// // when a game is not found for the provided id. Add the corresponding tests for it.

// // add a DELETE /games/:id endpoint that can remove the corresponding game. If the game does not exists return a 
// // 404 status code. Write tests for this endpoint.
module.exports = server;