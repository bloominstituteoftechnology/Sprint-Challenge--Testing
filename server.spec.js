const request = require("supertest");

const { server } = require("./server");

describe("server.js", () => {
  it("runs the tests", () => {
    expect(true).toBeTruthy();
  });
});

describe("/games POST", () => {
  it("returns a 200 status code if successful", async () => {
    let title = "Pacman";
    let genre = "Arcade";
    let releaseYear = 1980;
    const response = await request(server)
      .post("/games")
      .send({ title, genre, releaseYear });
    expect(response.status).toEqual(200);
  });
  it("should add a game and return the title", async () => {
    let title = "Pacman";
    let genre = "Arcade";
    let releaseYear = 1980;
    const response = await request(server)
      .post("/games")
      .send({ title, genre, releaseYear });
    expect(response.body).toEqual({ Added: "Pacman Arcade 1980" });
  });
  it(`should return json`, async () => {
    let title = "Pacman";
    let genre = "Arcade";
    let releaseYear = 1980;
    const response = await request(server)
      .post("/games")
      .send({ title, genre, releaseYear });
    expect(response.type).toEqual("application/json");
  });
  it("returns a 422 status code if failed", async () => {
    let title = "Pacman";
    let genre = "Arcade";
    let releaseYear = 1980;
    const response = await request(server)
      .post("/games")
      .send({ title, releaseYear });
    expect(response.status).toEqual(422);
  });
  it("returns a 405 status code if game title already exists", async () => {
    let title = "Pacman";
    let genre = "Arcade";
    let releaseYear = 1980;
    const response = await request(server)
      .post("/games")
      .send({ title, genre, releaseYear });
    expect(response.status).toEqual(405);
  });
});

describe("/games GET", () => {
  it("returns a 200 status code", async () => {
    const response = await request(server).get("/games");

    expect(response.status).toEqual(200);
  });
  it("should return a list of games", async () => {
    const expectedBody = [];

    const response = await request(server).get("/games");

    expect(response.body).toEqual(expectedBody);
  });
  it(`should return json`, async () => {
    const response = await request(server).get("/games");

    expect(response.type).toEqual("application/json");
  });
});
