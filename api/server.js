const express = require('express');

const server = express();

server.use(express.json());

let id = 0;
let state =[];


server.get('/', (req, res) => {
    res
    .status(200)
    .json('the line is hot');
});

server.get('/api/games', (req, res, next) => {
        console.log(state);
        res.status(200).json(state);
})


server.post('/api/games', (req, res, next) => {
	if (req.body.title && req.body.genre && req.body.releaseYear) {
        const { title, genre, releaseYear } = req.body;
        console.log(state);
        state.push({title, genre, releaseYear});
        id++;
		// state[id] = { title, genre, releaseYear };
        res
        .status(201)
        .json({ gameInfo: title, id });
	} else {
        res
        .status(422);
        next(['422 Unprocessable Entry', 'incomplete request: Missing title, genre, or releaseYear.']);
        
	}
});

module.exports = server;

