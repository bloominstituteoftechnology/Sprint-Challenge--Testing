const server = require("./index");
const request = require("supertest");

describe("GET", () => {
  it("should return an array", async () => {
    const expected = [];
    const response = await request(server).get("/games");
    expect(response.body).toEqual(expected);
  });

  it("should return status 200", async () => {
    const response = await request(server).get("/games");

    expect(response.status).toBe(200);
  });

  it("should return JSON", async () => {
    const response = await request(server).get("/games");

    expect(response.type).toBe("application/json");
  });
});

describe("POST", () => {
  it("should return a game title, its genre, and release year", async () => {
    const title = "Spider-Man";
    const genre = "Action/Adventure";
    const releaseYear = 2018;
    const response = await request(server)
      .post("/games")
      .send({ title, genre, releaseYear });
    expect(response.body).toEqual({
      Message: "Spider-Man Action/Adventure from 2018 has been added"
    });
  });

  it("should return status 422", async () => {
    const response = await request(server).post("/games");

    expect(response.status).toBe(422);
  });

  it("should return JSON", async () => {
    const response = await request(server).post("/games");

    expect(response.type).toBe("application/json");
  });
});
