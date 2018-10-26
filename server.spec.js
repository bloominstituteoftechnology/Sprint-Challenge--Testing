const request = require("supertest");

const server = require ("./server.js");

// POST Tests
describe("POST endpoint for /games API", () => {
    it("should POST game(s) to games array", async () => {
        const title = "Pacman";
        const genre = "Arcade";

        const expected = { title: "Pacman", genre: "Arcade" };
        const response = await request(server).post("/games").send({ title, genre });
        expect(response.body).toEqual(expected);
    })

    it("should return status code 200", async () => {
      const title = "Street Fighter 2";
      const genre = "Arcade";

      const response = await request(server)
        .post("/games").send({ title, genre });
        expect(response.status).toEqual(200);
      });

      it("should return status 422 if bad POST request", async () => {
        const response = await request(server).post("/games");
        expect(response.status).toEqual(422);
      });

      it("should return JSON", async () => {
        const response = await request(server).post("/games");
        expect(response.type).toBe("application/json");
      });
})

// GET endpoints Tests

describe ("GET endpoint for /games API", () => {
  it('should return status code 200', async () => {
    const response = await request(server).get('/games');
    expect(response.status).toBe(200);
  });

  it('should return JSON', async () => {
    const response = await request(server).get('/games');
    expect(response.type).toBe('application/json');
  });

  it('should return a game title', async () => {
    const expected = 'Pacman';
    const response = await request(server).get('/games');
    expect(response.body.title).toEqual(expected);
  });
})
