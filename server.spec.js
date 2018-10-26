const request = require("supertest");
const server = require("./server.js");

describe("server.js", () => {
  it("run the tests", () => {
    expect(true).toBeTruthy();
  });

  describe("GET /games", () => {
    it("should return a 200 status code", async () => {
      const response = await request(server).get("/games");
      expect(response.status).toEqual(200);
    });

    it("should return an array", async () => {
      const response = await request(server).get("/games");
      expect(Array.isArray(response.body)).toEqual(true);
    });

    it("should return an empty array", async () => {
        const response = await request(server).get("/games");
        expect(response.body).toEqual([]);
      });
  });

  describe("POST /games", () => {
    it("should return a 200 status code", async () => {
      const response = await request(server)
        .post("/games")
        .send({ title: "Pacman", genre: "Arcade", releaseYear: 1980 });
      expect(response.status).toEqual(200);
    });

    it("should return a 422 status code", async () => {
      const response = await request(server)
        .post("/games")
        .send({ title: "", genre: "Arcade", releaseYear: 1980 });
      expect(response.status).toEqual(422);
    });

    it("should return a 422 status code", async () => {
      const response = await request(server)
        .post("/games")
        .send({ title: "Pacman", genre: "", releaseYear: 1980 });
      expect(response.status).toEqual(422);
    });


  });
});