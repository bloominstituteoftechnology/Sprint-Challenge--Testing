const request = require("supertest");
const server = require("./server.js");

describe("server", () => {
  describe("/ endpoint", () => {
    it("returns 200 status code", async () => {
      const response = await request(server).get("/");
      expect(response.status).toBe(200);
    });

    it("returns json", async () => {
      const response = await request(server).get("/");
      expect(response.type).toBe("application/json");
    });
  });
});
