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
