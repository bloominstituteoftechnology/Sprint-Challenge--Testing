const server = require("./server");
const request = require("supertest");

describe("server.js", () => {
  describe("get", () => {
    it("get correct status", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });

    it("get data", async () => {
      const res = await request(server).get("/");
      console.log(res.body);
      expect(res.body).toEqual([
        { title: "Psychonauts", genre: "Platform", releaseYear: 2005 },
        { title: "Psychonauts 2", genre: "Platform", releaseYear: 2019 }
      ]);
    });

    it("should return a JSON object", async () => {
      const res = await request(server).get("/");
      expect(res.type).toBe("application/json");
    });
  });

  describe('post', () => {
    it('return correct status', async () => {
      const res = await request(server).post('/').send(
        { title: "Grim Fandango", genre: "Adventure game", releaseYear: 1998 }
      )
      expect(res.status).toBe(201)
    })

    it('return correct data', async () => {
      const res = await request(server).post('/').send(
        { title: "Grim Fandango", genre: "Adventure game", releaseYear: 1998 }
        )
      expect(res.body).toBe(4)
    })

    it('fail if data incomplete', async () => {
      const res = await request(server).post('/').send(
        { title: "Grim Fandango", releaseYear: 1998 }
      )
      expect(res.status).toBe(422)
    })

    it('prevent duplicates by name', async () => {
      const res = await request(server).post('/').send({
          title: "Psychonauts",
          genre: "Platform",
          releaseYear: 2005
        })
      expect(res.status).toBe(201)
    })
  })
});