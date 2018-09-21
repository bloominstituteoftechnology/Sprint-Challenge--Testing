const request = require("supertest");
const app = require("./server");

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
});
