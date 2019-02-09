const server = require("./server.js");
const request = require("supertest");

describe("GET /games tests", () => {
  it("Return status 200", async () => {
    const response = await request(server).get("/games");
    expect(response.status).toBe(200);
  });
  it("There's an array of games, even if empty", async () => {
    const response = await request(server).get("/games");
    expect(Array.isArray(response.body)).toBe(true);
  });
  it("Return an array of games", async () => {
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

describe("POST /games tests", () => {
	it("Return status 201", async () => {
		const newgame = { title: "Donkey Kong", genre: "Platformer", releaseYear: 1994 };
		const response = await request(server)
			.post("/games")
			.type("JSON")
			.send(newgame)
			.set("Accept", "application/json");
		expect(response.status).toBe(201);
	});
	it("Return error 422 if missing required data", async () => {
		const newGame = { title: null, genre: "Shooter", releaseYear: 2004 };
		const response = await request(server)
			.post("/games")
			.type("JSON")
			.send(newGame)
			.set("Accept", "application/json");

		expect(response.status).toBe(422);
	});
	it("Return the new array", async () => {
		const gameArray = [
			{
				title: "Pac-man",
				genre: "arcade",
				releaseYear: 1980
			},
			{ title: "Soulcalibur", genre: "Fighting", releaseYear: 1999 }
		];
		const newgame = { title: "Soulcalibur", genre: "Fighting", releaseYear: 1999 };
		const response = await request(server)
			.post("/games")
			.type("JSON")
			.send(newgame)
			.set("Accept", "application/json");
		expect(response.body).toEqual(gameArray);
	});
});