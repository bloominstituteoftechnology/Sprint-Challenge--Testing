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
        .send({ title: "Pokemon", genre: "RPG", releaseYear: 1996 });
      expect(response.status).toEqual(200);
    });

    it("should return a 422 status code", async () => {
      const response = await request(server)
        .post("/games")
        .send({ title: "Wow", genre: "Arcade", releaseYear: 2016 });
      expect(response.status).toEqual(422);
    });

    it("should return a 422 status code", async () => {
      const response = await request(server)
        .post("/games")
        .send({ title: "Who is this", genre: "", releaseYear: 2014 });
      expect(response.status).toEqual(422);
    });


  });
}); 