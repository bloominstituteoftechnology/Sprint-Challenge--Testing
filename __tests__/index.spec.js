const request = require("supertest");
const server = require("../app/server");

describe("API", () => {
  describe("POST /games", () => {
    it("should return status 422 if all fields are not completed", async () => {
      const resp = await request(server)
        .post("/games")
        .send({ title: "WoW", genre: "MMO-RPG" });
      expect(resp.status).toBe(422);
    });
    it("should return status code of 201 when post is successful", async () => {
      const resp = await request(server)
        .post("/games")
        .send({
          title: "World of Warcraft" + Math.floor(Math.random() * 1000),
          genre: "MMO-RPG",
          releaseYear: 2004 + Math.floor(Math.random() * 1000)
        });
      expect(resp.status).toBe(201);
    });
  });
  describe("GET /games", () => {
    it("should return an array with all games", async () => {
      const resp = await request(server).get("/games");
      expect(resp.body[0]).toMatchObject({
        id: 1,
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      });
    });
    it("should always return an array", async () => {
      const resp = await request(server).get('/games');
      expect(Array.isArray(resp.body)).toBe(true);
    })
  });
});
