const server = require("./api/server.js");
const request = require("supertest");

describe("GET /games", () => {
	it("should return status 200", async () => {
		const response = await request(server).get("/games");
		expect(response.status).toBe(200);
	});
	it("should check theres an array of games even if empty", async () => {
		const response = await request(server).get("/games");
		expect(Array.isArray(response.body)).toBe(true);
	});
	it("should return the array of games", async () => {
		const gamesArray = [
			{
				title: "Pac-man",
				genre: "arcade",
				releaseYear: 1980
			}
		];
		const response = await request(server).get("/games");
		expect(response.body).toEqual(gamesArray);
	});
});
describe("POST /games", () => {
	it("should return status 201", async () => {
		const newgame = { title: "Mario", genre: "Platformer", releaseYear: 1993 };
		const response = await request(server)
			.post("/games")
			.type("JSON")
			.send(newgame)
			.set("Accept", "application/json");
		expect(response.status).toBe(201);
	});
	it("should return error 422", async () => {
		const newGame = { title: null, genre: "shooter", releaseYear: 2004 };
		const response = await request(server)
			.post("/games")
			.type("JSON")
			.send(newGame)
			.set("Accept", "application/json");

		expect(response.status).toBe(422);
	});
	it("should return the new array", async () => {
		const gameArray = [
			{
				title: "Pac-man",
				genre: "arcade",
				releaseYear: 1980
			},
			{ title: "007", genre: "Shooter", releaseYear: 1997 }
		];
		const newgame = { title: "007", genre: "Shooter", releaseYear: 1997 };
		const response = await request(server)
			.post("/games")
			.type("JSON")
			.send(newgame)
			.set("Accept", "application/json");
		expect(response.body).toEqual(gameArray);
	});
});
