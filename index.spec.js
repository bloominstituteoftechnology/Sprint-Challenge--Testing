const request = require("supertest");

const server = require("./server.js");

describe("server.js", () => {
  // "/" Route Testing
  describe("/ route", () => {
    it("should return status code 200", async () => {
      const response = await request(server).get("/");

      expect(response.status).toBe(200);
    });
  });
  it("Should return JSON", async () => {
    let response = await request(server).get("/");

    expect(response.type).toBe("application/json");
  });
  it("Should return with a body like: {massage: 'Up and Running'}", async () => {
    let response = await request(server).get("/");

    expect(response.body).toEqual({ message: "Up and Running" });
  });
});
