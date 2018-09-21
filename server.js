const express = require("express");
const server = express();

server.use(express.json());

let games = [
	{ id: 1, title: "Grim Fandango", genre: "Adventure", yearReleased: 2000 },
];
let id = 1;

server.post("/api/games", (req, res) => {
	if (!req.body.title || !req.body.genre) {
		return res
			.status(404)
			.json({ message: "Please provide title and genre" });
	}
	let title = req.body.title;
	let genre = req.body.genre;
	let yearReleased = req.body.yearReleased;

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

// server.post("/api/games", (req, res) => {
// 	res.status(200).json({ message: "sup" });
// });

module.exports = server;
