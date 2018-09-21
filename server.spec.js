const request = require("supertest");
const app = require("./server");

describe("GET /games", () => {
  it("returns a status of 200", () => {
    return request(app)
      .get("/games")
      .expect(200);
  });

  it("returns an empty array when there are no games", () => {
    return request(app)
      .get("/games")
      .then(data => {
        expect(data.body.constructor).toBe(Array);
      });
  });
});

describe("POST /games", () => {
  it("succesful addition returns 201", async done => {
    await request(app)
      .post("/games")
      .send({
        title: "GTA",
        genre: "RPG",
      })
      .expect(201);
    done();
  });

  it("it creates a new game object and returns the object with id", async done => {
    const data = await request(app)
      .post("/games")
      .send({
        title: "Hacknet",
        genre: "Programming",
      });

    expect(typeof data.body.id).toBe("number");
    expect(data.body).toEqual({
      id: data.body.id,
      title: "Hacknet",
      genre: "Programming",
    });
    done(null);
  });

  it("returns 422 if title or genre is not given", async done => {
    await request(app)
      .post("/games")
      .send({
        title: "Does not matter",
      })
      .expect(422);

    await request(app)
      .post("/games")
      .send({
        genre: "Does not matter",
      })
      .expect(422);

    done();
  });

  it("validates input and returns 405 if title is not unique", () => {
    return request(app)
      .post("/games")
      .send({
        title: "Hacknet",
        genre: "Programming",
      })
      .expect(405);
  });
});

describe("GET /games", () => {
  it("returns the list of games added", () => {
    return request(app)
      .get("/games")
      .then(response => {
        expect(response.body.length).toBe(2);
      });
  });
});

describe("GET /games/:id", () => {
  it("returns 200 for a succesful get", () => {
    return request(app)
      .get("/games/1")
      .expect(200);
  });

  it("returns a specific game", () => {
    return request(app)
      .get("/games/1")
      .then(response => {
        expect(response.body).toEqual({
          id: 1,
          title: "GTA",
          genre: "RPG",
        });
      });
  });

  it("returns 404 if the id is invalid", () => {
    return request(app)
      .get("/games/invalidid")
      .expect(404);
  });
});

describe("DELETE /games/:id", () => {
  it("returns 200 if delete was successful", () => {
    return request(app)
      .delete("/games/2")
      .expect(200);
  });

  it("returns the deleted object", () => {
    return request(app)
      .delete("/games/1")
      .then(response => {
        expect(response.body).toEqual({
          id: 1,
          title: "GTA",
          genre: "RPG",
        });
      });
  });

  it("returns 404 if the id is invalid", () => {
    return request(app)
      .delete("/games/invalidid")
      .expect(404);
  });
});
