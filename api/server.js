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
    if (state.length === 0) {
        res
        .status(204)
        .json([]);
    } else {
        // let arr = [];
        // for (let id in state) {
        //     arr.push({ id: Number(id, ...state[id]) });
        // }
        res.status(200).json(state);
    }
})


server.post('/api/games', (req, res, next) => {
	if (req.body.title && req.body.genre && req.body.releaseYear) {
        const { title, genre, releaseYear } = req.body;
        state.push({title, genre, releaseYear});
		id++;
		state[`Game entry ID ${id}`] = { title, genre, releaseYear };
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

