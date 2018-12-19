const request = require("supertest");
const server = require("./api/server");

describe("server.js", () => {
  describe("POST /games route", () => {
    it("should return JSON", async () => {
      const response = await request(server)
        .post("/games")
        .send({title: "Spider Man", genre: "Action", releaseYear: 2018});

      expect(response.type).toBe("application/json");
    });

    it("should have a title", async () => {
      const response = await request(server)
        .post("/games")
        .send({genre: "RPG"});

      expect(response.body).toEqual({error: "title and genre required"});
    });

    it("should have a genre", async () => {
      const response = await request(server)
        .post("/games")
        .send({genre: "Final Fantasy"});

      expect(response.body).toEqual({error: "title and genre required"});
    });

    it("should return a 201 status code when adding a game is successful", async () => {
      const response = await request(server)
        .post("/games")
        .send({title: "ESPN NFL 2K5", genre: "Sports", releaseYear: 2004});

      expect(response.status).toBe(201);
    });
  });

  describe("GET /games route", () => {
    it("should return a status code of 200", async () => {
      const response = await request(server).get("/games");

      expect(response.status).toBe(200);
    });

    it("should return JSON", async () => {
      const response = await request(server).get("/games");

      expect(response.type).toBe("application/json");
    });

    it("should return an array of objects", async () => {
      const response = await request(server).get("/games");

      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
