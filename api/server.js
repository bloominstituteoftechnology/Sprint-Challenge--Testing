const express = require("express");

const server = express();

const games = [
	{
		title: "Pac-man",
		genre: "arcade",
		releaseYear: 1980
	}
];

server.use(express.json());

server.get("/games", (req, res) => {
	res.status(200).json(games);
});

server.post("/games", (req, res) => {
	const { title, genre, releaseYear } = req.body;
	const game = { title, genre, releaseYear };
	const newGames = [...games, game];

	if (!title || !genre) {
		res
			.status(422)
			.json({ error: "Missing a title or genre, they are required" });
	} else {
		res.status(201).json(newGames);
	}
});

module.exports = server;
