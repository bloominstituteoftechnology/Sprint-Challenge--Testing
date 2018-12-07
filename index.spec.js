const server = require("./index");

const request = require("supertest");

describe("index.js", () => {
  describe("GET /games route", () => {
    it("should return status code 200", async () => {
      let response = await request(server).get("/games");
      expect(response.status).toBe(200);
    });

    it("should return JSON", async () => {
      let response = await request(server).get("/games");
      expect(response.type).toBe("application/json");
    });
    it("should return an array, even if there are no games stored", async () => {
      let response = await request(server).get("/games");
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
  describe("POST /games route", () => {
    it("should return the added game", async () => {
      let response = await request(server)
        .post("/games")
        .send({
          title: "Pacman",
          genre: "Arcade",
          releaseYear: 1980
        });
      expect(response.body).toEqual({
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980,
        id: 1
      });
    });
    it("return a 201 success code if successful", async () => {
      let response = await request(server)
        .post("/games")
        .send({
          title: "Pacman",
          genre: "Arcade",
          releaseYear: 1980
        });
      expect(response.status).toBe(201);
    });
    it("should return an error if title and genre aren't both provided", async () => {
      let response = await request(server)
        .post("/games")
        .send({
          title: "Pacman"
        });
      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        error: "Please provide a title and genre."
      });
    });
  });
});
