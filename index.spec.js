const server = require("./index");

const request = require("supertest");

describe("index.js", () => {
  describe("/games route", () => {
    it("should return status code 200", async () => {
      let response = await request(server).get("/games");
      expect(response.status).toBe(200);
    });

    it("should return JSON", async () => {
      let response = await request(server).get("/games");
      expect(response.type).toBe("application/json");
    });
    it("should return an array, even if there are no games stored", async () => {
      let response = await request(server).get("/games");
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
