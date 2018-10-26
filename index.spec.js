const server = require("./api/server.js");
const request = require("supertest");

describe("GET /", () => {
	it("should return status 200", async () => {
		const response = await request(server).get("/");
		expect(response.status).toBe(200);
	});
	it("should return an array of games", async () => {
		const response = await request(server).get("/games");
		expect(Array.isArray(response.body)).toBe(true);
	});
});
