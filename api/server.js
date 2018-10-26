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
server.get("/", (req, res) => {
	res.status(200).json({ message: "server is up and running" });
});
server.get("/games", (req, res) => {
	res.status(200).send(games);
});

server.post("/games", (req, res) => {
	const { game } = req.body;
});

module.exports = server;
