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

  describe("POST Routes", () => {
    it("Returns games when new item added", async () => {
      const response = await request(server)
        .post("/games")
        .send({ title: "Fifa", genre: "videoGame", releaseYear: "2000" });
      const expectedBody = [
        { id: 0, title: "Monopoly", genre: "boardgame", releaseYear: 1980 },
        { id: 1, title: "Chess", genre: "boardgame", releaseYear: 1500 },
        { id: 2, title: "Fifa", genre: "videoGame", releaseYear: "2000" }
      ];
      expect(response.body).toEqual(expectedBody);
    });

    it("Returns status code 200 when successfull", async () => {
      const response = await request(server)
        .post("/games")
        .send({ title: "testTitle", genre: "something" });

      expect(response.status).toEqual(200);
    });

    it("Return status code of 422 if information mission", async () => {
      const response = await request(server)
        .post("/games")
        .send({ title: "abcd" });
      expect(response.status).toEqual(422);
    });
  });
});
