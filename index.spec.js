const request = require("supertest");

const server = require("./api/server.js");

describe("server", () => {
  it("can run tests", () => {
    expect(true).toBeTruthy();
  });
});
