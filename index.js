const request = require("supertest");

const server = require("./server.js");

describe("server.js", () => {
  describe("GET: unknown endpoint (/???)", () => {
    it("should return status code 404 file not found", async () => {
      const expected = 404;
      const res = await request(server).get("/notgames");
      expect(res.status).toEqual(expected);
    });
  });

  describe("GET: (/games)", () => {
    it("should return status code 200", async () => {
      const expected = 200;
      const res = await request(server).get("/games");
      expect(res.status).toEqual(expected);
    });

    it("should return a list of games", () => {
      const expected = [
        {
          "title": "Pacman",
          "genre": "Arcade",
          "releaseYear": "1980"
        }
      ];
      const res = await request(server).get("/games");
      expect(res.text).toEqual(expected);
    });
  });
});
