const request = require("supertest");

const server = require("./server");

describe("server.js is working", () => {
  it("running", () => {
    expect(true).toBeTruthy();
  });

  describe("GET Routes", () => {
    it("Returns status code 200", async () => {
      const response = await request(server).get("/games");
      expect(response.status).toEqual(200);
    });

    it("Return a list of games", async () => {
      const response = await request(server).get("/games");
      const expectedBody = [
        { id: 0, title: "Monopoly", genre: "boardgame", releaseYear: 1980 },
        { id: 1, title: "Chess", genre: "boardgame", releaseYear: 1500 }
      ];
      expect(response.body).toEqual(expectedBody);
    });
    it("Return an array always", async () => {
      const response = await request(server).get("/games");
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });
  describe("POST Routes", () => {});
});
