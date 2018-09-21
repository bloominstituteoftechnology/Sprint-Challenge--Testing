const server = require("./server");
const request = require("supertest");

describe("server.js", () => {
  it("runs the test", () => {
    expect(true).toBeTruthy();
  });
  describe("GET /games", () => {
    it("returns a 200 (OK) status code", async () => {
      const response = await request(server).get("/games");
      expect(response.status).toEqual(200);
    });
    it("should return games ", async () => {
      const response = await request(server).get("/games");
      const expectedBody = {
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      };

      expect(response.body).toEqual(expectedBody);
    });
    it("should return JSON ", async () => {
      const response = await request(server).get("/games");
      expect(response.type).toEqual("application/json");
    });
  });
  describe("POST /games", () => {
    it("should return JSON", async () => {
        let title = "Galaga";
        let genre = "Arcade";
        let releaseYear = 1980;
        const response = await request(server)
          .post("/games")
          .send({ title, genre, releaseYear });
        expect(response.type).toEqual("application/json");
      });
      it("returns a 200 (OK) status code", async () => {
       const response = await request(server).post("/games");
        expect(response.status).toEqual(200);
      });
      it('Should return a status code 200 if game is valid.', async () => {
        const expected = 200;
        const response = await request(server)
            .post('/games')
            .send({ title: 'Galaga', genre: 'Arcade', releaseYear: 1980 });
        expect(response.status).toEqual(expected);
    });
      it('Should return status code 404 if duplicate title', async () => {
        const status = 404;
         const response = await request(server)
        .post('/games')
        .send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
        expect(response.status).toEqual(status);
    })
  });
});
