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
	it("test for that bad 422", async () => {
		const body = {title: "Pacman"};
		const response = await request(server)
			.post("/games")
			.send(body);

		expect(response.status).toBe(422);
	});

	// Does it return JSON???
	it("test that JSON is being used", async () => {
		const body = {title: "Pacman", genre: "Arcade", Year: "1980"};
		const response = await request(server)
			.post("/games")
			.send(body);

		expect(response.body).toEqual(body);
	});

});


// Test the entire GET endpoint
describe("GET test", () => {
	// Test for GET 200 status
	it("test for code 200", async () => {
		const response = await request(server).get("/games");
		expect(response.status).toBe(200);
	});
	
	// Test for array on '/games'
	it("Is an array being returned?", async () => {
		const response = await request(server).get("/games");
		expect(response.body).toEqual(Array());
	});
	
	// Test for empty array on '/games'
	it("Is an empty array being returned?", async () => {
		const response = await request(server).get("/games");
		expect(response.body).toEqual([])
	});
});
