const server = require("../server.js");
const req = require("supertest");
const dbConfig = require("../games/config/gamesConfig.js");
//const dummyData = require("../data/dummyData/dummyData.js")

const dummyDataFull = {
  title: "Pacman", // required
  genre: "Arcade", // required
  releaseYear: 1980 // not required
};
const dummyDataNull = {
  title: null, // required
  genre: "Arcade", // required
  releaseYear: 1980 // not required
};
const dummyDataFortnite = {"genre": "shooter", "id": 1, "releaseYear": 2017, "title": "fortnite"}

describe("server", () => {
  beforeAll(() => {
    return dbConfig.seed.run();
  });
  afterEach(() => {
    return dbConfig.seed.run();
  });

  describe("POST /", () => {
    it("should return status code: 422 when data is missing", async () => {
      const res = await req(server)
        .post("/games")
        .send(dummyDataNull);
      expect(res.status).toBe(422);
    });
    it("should return status code: 201 when data requirements are met", async () => {
      const res = await req(server)
        .post("/games")
        .send(dummyDataFull);
      expect(res.status).toBe(201);
    });
    it("should return id of game posted: 4", async () => {
      const res = await req(server)
        .post("/games")
        .send(dummyDataFull);
      expect(res.body).toBe(4);
    });
    it("should return status code: 405 if data is already in database", async () => {
      const res = await req(server)
        .post("/games")
        .send(dummyDataFortnite);
      expect(res.status).toBe(405);
    });
  });
  describe("GET /", () => {
    it("should return status code: 200", async () => {
      const res = await req(server).get("/games");
      expect(res.status).toBe(200);
    });
    it("should return an array of games", async () => {
      const res = await req(server).get("/games");
      expect(Array.isArray(res.body)).toBe(true);
    });
    it("should return an array of games if no data is in db", async () => {
      await dbConfig("games").truncate();
      const res = await req(server).get("/games");
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
  describe("GET /:id", () => {
    it("should return status code: 200", async () => {
      const res = await req(server).get("/games/1");
      expect(res.status).toBe(200);
    });
    it("should return status code: 404 if not found", async () => {
      const res = await req(server).get("/games/100");
      expect(res.status).toBe(404);
    });
    it("should a return single object", async () => {
      const res = await req(server).get("/games/1");
      expect(Array.isArray(res.body)).toBe(false);
      expect(res.body).toEqual(dummyDataFortnite);
    });
  });
  describe("DELETE /:id", () => {
    it("should return status code: 200", async () => {
        const res = await req(server).delete("/games/1");
        expect(res.status).toBe(200)
    });
    it("should return status code: 404 if not found", async () => {
        const res = await req(server).delete('/games/100')
        expect(res.status).toBe(404)
    });
    it("should return number of deletes made", async () => {
        const res = await req(server).delete('/games/1')
        expect(res.body).toBe(1)
    });
    it("should delete correct object", async () => {
        await req(server).delete('/games/1')
        const res = await req(server).get('/games/1')        
        expect(res.status).toBe(404)
    });
  });
});
