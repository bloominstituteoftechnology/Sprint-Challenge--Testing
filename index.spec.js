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

      expect(response.body).toBe({error: "title and genre required"});
    });

    it("should have a genre", async () => {
      const response = await request(server)
        .post("/games")
        .send({genre: "Final Fantasy"});

      expect(response.body).toBe({error: "title and genre required"});
    });

    it('should add a game' async () => {
      const response = await request(server)
        .post('/games')
        .send({title: 'ESPN NFL 2K5', genre: 'Sports', releaseYear: 2004})

      expect(response.body).toBe(1)
    })
  });
});
