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
    it("should return status of 405 if title is not unique", async () => {
      const resp = await request(server)
        .post("/games")
        .send({
          title: "World of Warcraft",
          genre: "MMORPG",
          releaseYear: 2004
        });
      expect(resp.status).toBe(405);
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
      const resp = await request(server).get("/games");
      expect(Array.isArray(resp.body)).toBe(true);
    });
  });
  describe("GET /games/:id", () => {
    it("if game id isn't found it should return game not found message", async () => {
      const resp = await request(server).get("/games/100");
      expect(resp.body.message).toBe("Game not found");
    });
    it("should return game if found by id", async () => {
      const resp = await request(server).get("/games/1");
      expect(resp.body).toMatchObject({
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      });
    });
  });
  describe("DELETE /games/:id", () => {
    it("should return status 404 if game not found", async () => {
      const resp = await request(server).del(
        `/games/10000}`
      );
      expect(resp.status).toBe(404);
    });
    it("should return status 200 if game is found", async () => {
      const games = await request(server).get("/games");
      const resp = await request(server).del(`/games/${games.body[games.body.length - 1].id}`);
      expect(resp.status).toBe(200);
    })
  });
});
