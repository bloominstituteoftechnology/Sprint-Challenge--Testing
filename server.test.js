const request = require("supertest");

const server = require("./server.js");



describe("Sanity Check - server up", () => {
  test("should server Up ", async () => {
    let response = await request(server).get("/");

    expect(response).toBe({ message: "server up" });
  });
});

describe("/games route POST", () => {
  const input = {
    title: "Pacman",
    genre: "Arcade",
    releaseYear: 1980
  };
  const input2 = {
    title: "Wing",
    genre: "PC",
    releaseYear: 2050
  };

  test("should return 422 for given incomplete input ", async () => {
    let response = await request(server)
      .post("/games")
      .send();
    expect(response.status).toBe(422);

    reponse = await request(server)
      .post("/games")
      .send({ title: "Pang" });
    expect(response.status).toBe(422);

    reponse = await request(server)
    .post("/games")
    .send({ genre: "home" });
  expect(response.status).toBe(422);

  reponse = await request(server)
  .post("/games")
  .send({ titl: "Pacman",
  genre: "Arcade", });
expect(response.status).toBe(422);

  });

  test("should return posted object when correct input is given ", async () => {
    let response = await request(server)
      .post("/games")
      .send(input);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Pacman");
  });
});

describe("/game route GET", () => {
  test("should return empty array ", async () => {
    let response = await request(server).get("/games");

    expect(typeof response.body).toBe(array);
    expect(response.body).toBe([]);
  });

  test("should return array of games ", async () => {
    // add 2 games info to test GET
    await request(server)
      .post("/games")
      .send(input);

      await request(server)
      .post("/games")
      .send(input2);

    let response = await request(server).get("/games");

    expect(typeof response.body).toBe(array);
    expect(response.body).toBe([
        {
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      },
      {
        title: "Wing",
        genre: "PC",
        releaseYear: 2050
      }
    ]);
  });
});
