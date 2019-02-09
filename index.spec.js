const request = require("supertest");
const server = require("./server");

// Test the entire POST endpoint
describe("POST test", () => {

	// Test for status code 200 
	it("test for that sweet 200", async () => {
		const body = {title: "Pacman", genre: "Arcade", Year: 1980};
		const response = await request(server)
			.post("/games")
			.send(body);

		expect(response.status).toBe(200);

	});

	// Test for 422
	it("test for that bad 422", async() => {
		const body = {title: "Pacman"};
		const response = await request(server)
			.post("/games")
			.send(body);

		expect(response.status).toBe(422);
	});

	// Does it return JSON???
	it("test that JSON is being used", async() => {
		const body = {title: "Pacman", genre: "Arcade", Year: "1980"};
		const response = await request(server)
			.post("/games")
			.send(body);

		expect(response.body).toEqual(body);
	});

});



