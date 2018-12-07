const request = require("supertest");

const server = require("./server.js");

/*
describe("/ route", () => {

});


it("should return json response type ", async () => {
    let response = await request(server).get("/");

    expect(response.type).toBe("application/json");
  });

*/

describe("Sanity Check - server up", () => {
  test("should server Up ", async () => {
    let response = await request(server).get("/");

    expect(response).toBe({ message: "server up" });
  });
});

describe("/game route POST", () => {
  const input = {
    title: "Pacman",
    genre: "Arcade",
    releaseYear: 1980
  };

  test("incomplete input ", async () => {
    let response = await request(server)
      .post("/")
      .send();
    expect(response.status).toBe(422);

    reponse = await request(server)
      .post("/")
      .send({ title: "Pang" });
    expect(response.status).toBe(422);
  });

  test("correct input ", async () => {
    let response = await request(server)
      .post("/")
      .send(input);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Pacman");
  });
});

describe("/game route GET", () => {
  test("should server Up ", async () => {
    let response = await request(server).get("/");

    expect(response).toBe({ message: "server up" });
  });
});
