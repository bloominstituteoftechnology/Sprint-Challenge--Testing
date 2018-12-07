const request = require("supertest");
const server = require("./index");

describe("/ route", () => {
  let response;
  beforeAll(async () => {
    try {
      response = await request(server).get("/");
    } catch (err) {
      response = "broken";
    }
  });

  it("should return status code 200", () => {
    expect(response.status).toBe(200);
  });
  it("should return json object", () => {
    expect(response.type).toBe("application/json");
  });
});

describe("/games route", () => {
  describe("GET", () => {
    let response;
    beforeAll(async () => {
      try {
        response = await request(server).get("/games");
      } catch (err) {
        response = "broken";
      }
    });

    it("should return status code 200", () => {
      expect(response.status).toBe(200);
    });
    it("should return json object", () => {
      expect(response.type).toBe("application/json");
    });
  });
});
