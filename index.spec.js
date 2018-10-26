const server = require("./api/server.js");
const request = require("supertest");

describe("GET /games", () => {
	it("should return status 200", async () => {
		const response = await request(server).get("/games");
		expect(response.status).toBe(200);
	});
	it("should return an array of games", async () => {
		const response = await request(server).get("/games");
		expect(Array.isArray(response.body)).toBe(true);
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
	it("should return an array of games", async () => {
		const response = await request(server).post("/games");
		expect(Array.isArray(response.body)).toBe(true);
	});
});
