const request = require("supertest");
const server = require("./server.js");

describe("server", () => {
  describe("GET / endpoint", () => {
    it("returns 200 status code", async () => {
      let response = await request(server).get("/");
      expect(response.status).toBe(200);
    });

    it("returns json", async () => {
      let response = await request(server).get("/");
      expect(response.type).toBe("application/json");
    });
  });
  describe("POST /games endpoint", () => {
    it("returns status code 201 on valid body", async () => {
      let response = await request(server)
        .post("/games")
        .send({ title: "pacman", genre: "arcade", releaseYear: "1980" });
      expect(response.status).toBe(201);
    });
    it("returns status code 422 if required fields are missing", async () => {
      let response = await request(server)
        .post("/games")
        .send({ genre: "arcade" });
      expect(response.status).toBe(422);
    });
    it("returns json", async () => {
      let response = await request(server)
        .post("/games")
        .send({ title: "pacman", genre: "arcade", releaseYear: "1980" });
      expect(response.type).toBe("application/json");
    });
  });
  describe("GET /games endpoint", () => {
    it("returns 200 status code", async () => {
      let response = await request(server).get("/games");
      expect(response.status).toBe(200);
    });
    it("returns an object", async () => {
      let response = await request(server).get("/games");
      expect(typeof response.body === "object").toBeTruthy();
    });
    it("returns json", async () => {
      let response = await request(server).get("/");
      expect(response.type).toBe("application/json");
    });
  });
});
