const request = require("supertest");
const server = require("./server.js");

describe("Tests for POST API endpoint for /games", () => {
  it("POST /games API endpoint should return 422 status if no game data is sent", async () => {
    const response = await request(server).post("/games");
    expect(response.status).toBe(422);
  });

  it("POST /games API endpoint should return 422 status if incomplete game data  (no genre) is sent", async () => {
    const newGame = {
      name: "Street Fighter"
    };
    const response = await request(server)
      .post("/games")
      .send(newGame);
    expect(response.status).toBe(422);
  });

  it("POST /games API endpoint should return 422 status if incomplete game data  (no name) is sent", async () => {
    const newGame = {
      genre: "Arcade"
    };
    const response = await request(server)
      .post("/games")
      .send(newGame);
    expect(response.status).toBe(422);
  });

  it("POST /games API endpoint should return 201 status if correct game data is sent", async () => {
    const game = {
      name: "Pacman",
      genre: "Arcade",
      releaseYear: 1980
    };
    const response = await request(server)
      .post("/games")
      .send(game);
    expect(response.status).toBe(201);
  });

  it("POST /games API endpoint should return JSON", async () => {
    const game = {
      name: "Pacman",
      genre: "Arcade",
      releaseYear: 1980
    };
    const response = await request(server)
      .post("/games")
      .send(game);
    expect(response.type).toEqual("application/json");
  });
});

describe("Tests for GET API endpoint for /games", () => {
  it("GET /games should return list of games", async () => {
    const response = await request(server).get("/games");
    expect(response.status).toBe(200);
  });

  it("GET /games should return array", async () => {
    const response = await request(server).get("/games");
    expect(Array.isArray(response.body)).toEqual(true);
  });

  it("GET /games should return JSON", async () => {
    const response = await request(server).get("/games");
    expect(response.type).toEqual("application/json");
  });
});
