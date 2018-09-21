const express = require("express");
const server = express();

server.use(express.json());

let games = [
	{ id: 1, title: "Grim Fandango", genre: "Adventure", yearReleased: 2000 },
];

let id = 1;

let titles = [];

games.map(game => {
	titles.push(game.title);
});

server.post("/api/games", (req, res) => {
	if (!req.body.title || !req.body.genre) {
		return res
			.status(404)
			.json({ message: "Please provide title and genre" });
	}
	let title = req.body.title;
	let genre = req.body.genre;
	let yearReleased = req.body.yearReleased;

	if (titles.includes(title)) {
		return res
			.status(405)
			.json({ message: "This game is already in the database" });
	}

	const newGame = {
		id: id++,
		title,
		genre,
		yearReleased,
	};
	games.push(newGame);
	res.status(200).json(newGame);
});

server.get("/api/games", (req, res) => {
	res.status(200).json(games);
});

server.get("/api/games/:id", (req, res) => {
	if (!req.params.id === 0) {
		return res.status(404).json({ message: "That game doesn't exist" });
	}
	const game = games[req.params.id];
	res.status(200).json(game);
});

server.delete("/api/games/:id", (req, res) => {
	if (!req.params.id === 0) {
		return res.status(404).json({ message: "That game doesn't exist" });
	}
	const game = games[req.params.id];
	console.log(game);
	games.splice[req.params.id];
	res.status(200).json(game.id);
});

// server.post("/api/games", (req, res) => {
// 	res.status(200).json({ message: "sup" });
// });

module.exports = server;
