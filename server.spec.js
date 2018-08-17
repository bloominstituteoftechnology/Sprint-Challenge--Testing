const request = require("supertest");

const server = require("./server.js");

describe("server.js", () => {
  describe("root endpoint (/)", () => {
    it("should return status code 200 OK", async () => {
      const expected = 200;
      //   request(server)
      const response = await request(server).get("/");
      // .then(response => {
      //checks
      expect(response.status).toEqual(expected);
      // });
    });
  });
});
