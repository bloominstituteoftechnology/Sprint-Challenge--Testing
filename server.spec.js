const server = require("./server");

const request = require("supertest");

describe("post", () => {
	it("returns 200", done => {
		return request(server)
			.post("/api/games")
			.send({ title: "game", genre: "genre", yearRelease: 2000 })
			.expect(200, done);
	});

	it("returns 404", done => {
		return request(server)
			.post("/api/games")
			.send({ title: "title" })
			.expect(404, done);
	});
	it("returns 405", done => {
		return request(server)
			.post("/api/games")
			.send({
				title: "Grim Fandango",
				genre: "genre",
				yearRelease: 2000,
			})
			.expect(405, done);
	});

	it("returns data", done => {
		return request(server)
			.post("/api/games")
			.send({ title: "game", genre: "genre", yearReleased: 2000 })
			.then(response => {
				expect(response.body.hasOwnProperty("id")).toBe(true);
				expect(response.body.title).toBe("game");
				expect(response.body.genre).toBe("genre");
				expect(response.body.yearReleased).toBe(2000);
				done(null);
			})
			.catch(done);
	});
});

describe("get", () => {
	it("returns 200", done => {
		return request(server)
			.get("/api/games")
			.expect(200, done);
	});

	it("responds with array", done => {
		return request(server)
			.get("/api/games")
			.then(response => {
				expect(Array.isArray(response.body)).toBe(true);
				done(null);
			})
			.catch(done);
	});

	it("reponds with data", done => {
		return request(server)
			.get("/api/games")
			.then(response => {
				expect(response.body[0].id).toBe(1);
				done(null);
			})
			.catch(done);
	});
});

describe("get by id", () => {
	it("returns a 404", done => {
		return request(server)
			.get("/api/game/7")
			.expect(404, done);
	});

	it("returns the game data", done => {
		return request(server)
			.get("/api/games/0")
			.then(response => {
				expect(response.body.id).toBe(1);
				done(null);
			})
			.catch(done);
	});
});

describe("delete", () => {
	it("deletes a game", done => {
		return request(server)
			.delete("/api/games/0")
			.then(response => {
				expect(response.body).toBe(1);
				done(null);
			})
			.catch(done);
	});
	it("returns a 404", done => {
		return request(server)
			.get("/api/game/7")
			.expect(404, done);
	});
});
