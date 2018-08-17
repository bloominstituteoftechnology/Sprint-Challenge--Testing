const request = require("supertest");
const server = require("./server");
const games = require("./games");

describe("server.js", () => {
  describe("GET routes", () => {
    it("should return a status code of 200 OK", async () => {
      const expected = 200;
      const response = await request(server).get("/");
      expect(response.status).toEqual(expected);
    });

    it("should return the list of games", async () => {
      const expected = games;
      const response = await request(server).get("/");
      expect(response.body).toEqual(expected);
    });
  });
});
