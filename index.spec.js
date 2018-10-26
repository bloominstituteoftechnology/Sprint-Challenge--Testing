const request = require("supertest");
const server = require("./server.js");

describe("Test API endpoints", () => {
  it("POST /games API endpoint should return 422 status if no game data is sent", async () => {
    const response = await request(server).post("/games");
    expect(response.status).toBe(422);
  });

  it("POST /games API endpoint should return 422 status if incomplete game data  (no genre) is sent", async () => {
    const newGame = {
      title: "Street Fighter"
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
      title: "Pacman",
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
      title: "Pacman",
      genre: "Arcade",
      releaseYear: 1980
    };
    const response = await request(server)
      .post("/games")
      .send(game);
    expect(response.type).toEqual("application/json");
  });
});
