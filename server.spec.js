const request = require("supertest");

const server = require("./server.js");

describe("server", () => {
  it("test runs", () => {
    expect(true).toBeTruthy();
  });
});

describe("POST", () => {
  it("should return 422 no title", async () => {
    const response = await request(server)
      .post("/games")
      .send({
        title: "",
        genre: "Arcade",
        releaseYear: 1980
      });

    expect(response.status).toEqual(422);
  });

  it("should return 422 no genre", async () => {
    const response = await request(server)
      .post("/games")
      .send({
        title: "Pacman",
        genre: "",
        releaseYear: 1980
      });

    expect(response.status).toEqual(422);
  });

  it("should return 201 success", async () => {
    const response = await request(server)
      .post("/games")
      .send({
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      });

    expect(response.status).toEqual(201);
  });
});

describe("GET", () => {
  it("should return 200", async () => {
    const response = await request(server).get("/games");
    expect(response.status).toEqual(200);
  });

  it('should return array', async () => {
      const response = await request(server).get('/games');
      expect(Array.isArray(response.body)).toBe(true);
  })

  it('should return object', async() => {
      const response = await request(server).get('/games');
      expect(response.type).toEqual("application/json")
  })
});
