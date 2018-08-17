const request = require("supertest");

const { server, db } = require("./server.js");

describe("server.js", () => {
  describe("root endpoint (/)", () => {
    it("should return status code 200 OK", async () => {
      const expected = 200;
      const response = await request(server).get("/");
      expect(response.status).toEqual(expected);
    });
  });
  describe("endpoint get (/games)", () => {
    it("should return status code 200 ok", async () => {
      const expected = 200;
      const response = await request(server).get("/games");
      expect(response.status).toEqual(expected);
    });
    it("should return array of games", async () => {
      const expected = db;
      const response = await request(server).get("/games");
      expect(response.body).toEqual(expected);
    });
    it("should return empty array if no games", async () => {
      const expected = [];
      const response = await request(server).get("/games");
      expect(response.body).toEqual(expected);
    });
  });
  describe("endpoint post (/games)", () => {
    it("should return error code 422 if no game", async () => {
      const expected = 422;
      const response = await request(server)
        .post("/games")
        .send({ game: "" });
      expect(response.status).toEqual(expected);
    });
    it("should return error code 405 displicate game", async () => {
      const expected = 405;
      const response = await request(server)
        .post("/games")
        .send({
          title: "crossword",
          genre: "casual",
          releaseYear: "1920"
        });
      expect(response.status).toEqual(expected);
    });
    it("should return status code 201 created game", async () => {
      const expected = 201;
      const response = await request(server)
        .post("/games")
        .send({
          title: "checkers",
          genre: "casual",
          releaseYear: "1920"
        });
      expect(response.status).toEqual(expected);
    });
    it("should return game", async () => {
      const expected = {
        title: "checkers",
        genre: "casual",
        releaseYear: "1920"
      };
      const response = await request(server)
        .post("/games")
        .send({
          title: "checkers",
          genre: "casual",
          releaseYear: "1920"
        });
      expect(response.body).toEqual(expected);
    });
  });
});
