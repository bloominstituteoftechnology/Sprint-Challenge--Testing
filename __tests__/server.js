const db = require("../data/dbConfig");
const request = require("supertest");
const server = require("../api/server");

afterEach(async () => {
  await db("games").truncate();
});

describe("the route handler", () => {
  describe("get /games", () => {
    it("responds with 200", async () => {
      const response = await request(server).get("/games");
      expect(response.status).toBe(200);
    });
    it("responds with json", async () => {
      const response = await request(server).get("/games");
      expect(response.type).toMatch(/json/i);
    });
    it("sends the correct response object", async () => {
      const response = await request(server).get("/games");
      expect(response.body).toEqual([]);
    });
  });
  describe("post /games", () => {
    it("responds with 201 when the body is correct", async (req, res) => {
      const body = { title: "Kingdom Hearts", genre: "RPG", releaseYear: 2002 };
      const response = await request(server)
        .post("/games")
        .send(body);
      expect(response.status).toBe(201);
    });
  });
});
