const request = require("supertest");

// post games tests
describe("POST /games", () => {
  it("Should send an object with title and genre required", async () => {
    let res = await request(server)
      .post("/games")
      .send({ title: "Counter-Strike", genre: "shooter", releaseYear: 2000 });

    expect(res.body).toEqual({
      title: "Counter-Strike",
      genre: "shooter",
      releaseYear: 2000
    });
  });

  it("Should return status code of 201", async () => {
    let res = await request(server)
      .post("/games")
      .send({ title: "test", genre: "another test" });
    expect(res.status).toEqual(201);
  });

  it("Should return status code of 500 for not passing in title", async () => {
    let res = await request(server)
      .post("/games")
      .send({ genre: "another test" });
    expect(res.status).toEqual(500);
  });
});

// get games tests
describe("GET /games", () => {
  it("Should return a list of games", async () => {
    let res = await request(server).get("/games");

    expect(res.status).toEqual(200);
  });

  it("Should return json object", async () => {
    let res = await request(server).get("/games");

    expect(res.type).toBe("application/json");
  });

  // it("Should return status code of 500 for not passing in title", async () => {
  //   let res = await request(server)
  //     .post("/games")
  //     .send({ genre: "another test" });
  //   expect(res.status).toEqual(500);
  // });
});
