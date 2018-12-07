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
    it("should always return an array", () => {
      let content = JSON.parse(response.text);
      expect(Array.isArray(content)).toBeTruthy();
    });
  });
  describe("POST", () => {
    let response;
    beforeEach(async () => {
      try {
        response = await request(server)
          .post("/games")
          .send({
            title: "Battle Chess",
            genre: "Board Game",
            releaseYear: 1988
          });
      } catch (err) {
        response = "broken";
      }
    });
 
    it("should return status code 201", () => {
      expect(response.status).toBe(201);
    });
    it("should return json object", () => {
      expect(response.type).toBe("application/json");
    });
    it("should return string 'game added' ", () => {
      let content = JSON.parse(response.text);
      expect(content).toBe("Game added");
    });
  });
  describe("POST fail checks", () => {
    it("should return status code 422 for incomplete information", async () => {
      let response = await request(server)
        .post("/games")
        .send({ title: "Kirby" });
      expect(response.status).toBe(422);
    });
    
  });
});
