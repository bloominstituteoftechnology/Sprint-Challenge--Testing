const request = require("supertest");

const server = require("./api/server.js");

describe("POST /games", () => {
  it("should add game", async () => {
    const title = "Pacman";
    const genre = "Arcade";
    const releaseYear = 1980;

    const expected = { title: "Pacman", genre: "Arcade", releaseYear: 1980 };

    const response = await request(server)
      .post("/games")
      .send({ title, genre, releaseYear });

    expect(response.body).toEqual(expected);
  });

  it("should retrun status code 200", async () => {
    const title = "Pacman";
    const genre = "Arcade";
    const releaseYear = 1980;

    const response = await request(server)
      .post("/games")
      .send({ title, genre, releaseYear });

    expect(response.status).toEqual(200);
  });

  it("should return status code 422 if missing info"),
    async () => {
      const response = await request(server).post("/games");

      expect(response.status).toEqual(422);
    };

  it("should return JSON"),
    async () => {
      const response = await request(server).post("/games");

      expect(response.type).toBe("application/json");
    };
});
