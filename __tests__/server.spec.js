const request = require("supertest");
const server = require("../server.js");

describe("server.js", () => {
  describe("GET / (test route)", () => {
    it("returns a 200 (OK) status code", async () => {
      const response = await request(server).get("/");

      expect(response.status).toEqual(200);
    });

    it("correctly passing req.body check", async () => {
      const expectedBody = { api: "running" };
      const response = await request(server).get("/");

      expect(response.body).toEqual(expectedBody);
    });
  });
});
