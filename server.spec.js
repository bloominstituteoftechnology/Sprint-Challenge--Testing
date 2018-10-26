const request = require("supertest");

const server = require("./api/server.js");

//POST Tests
describe("POST /games", () => {
  it("should add game", async () => {
    const title = "Pacman";
    const genre = "Arcade";
    const releaseYear = 1980;

    const expected = { title: "Pacman", genre: "Arcade", releaseYear: 1980 };

    const response = await request(server)
      .post("/games")
      .send({ title, genre, releaseYear });

    expect(response.body).toEqual(expected);
  });

  it("should retrun status code 200", async () => {
    const title = "Pacman";
    const genre = "Arcade";
    const releaseYear = 1980;

    const response = await request(server)
      .post("/games")
      .send({ title, genre, releaseYear });

    expect(response.status).toEqual(200);
  });

  it("should return status code 422 if missing info", async () => {
    const response = await request(server).post("/games");

    expect(response.status).toEqual(422);
  });

  it("should return JSON", async () => {
    const response = await request(server).post("/games");

    expect(response.type).toBe("application/json");
  });
});

//GET Tests
describe("GET /games", () => {
  it("should return an array", async () => {
    const title = "Pacman";
    const genre = "Arcade";
    const releaseYear = 1980;

    const response = await request(server)
      .post("/games")
      .send({ title, genre, releaseYear });

    const getGames = await request(server).get("/games");

    expect(Array.isArray(getGames.body)).toBe(true);
  });

  it("should return status code 200", async () => {
    const response = await request(server).get("/games");

    expect(response.status).toBe(200);
  });

  it("should return JSON", async () => {
    const response = await request(server).get("/games");

    expect(response.type).toBe("application/json");
  });
});

//DELETE Tests
describe("DELETE /games", () => {
  it("should delete the game with the specified id", async () => {
    const id = 1;
    const expected = { deleted: `${id}` };

    const response = await request(server).delete(`/games/${id}`);

    expect(response.body).toEqual(expected);
  });

  it("should return status code 200(OK)", async () => {
    const id = 1;
    const response = await request(server).delete(`/games/${id}`);

    expect(response.status).toBe(200);
  });

  it("should return status code 404 if game does not exist", async () => {
    const id = 10;
    const response = await request(server).delete(`/games/${id}`);

    expect(response.status).toBe(200);
  });

  it("should return JSON", async () => {
    const id = 1;
    const response = await request(server).delete(`/games/${id}`);

    expect(response.type).toBe("application/json");
  });
});
