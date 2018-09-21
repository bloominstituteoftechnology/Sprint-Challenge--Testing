const server = require("./server");
const request = require("supertest");

// id, title, and genre are required categories, releaseYear is not required
const games = [
  { id: "1", title: "Pacman", genre: "Arcade", releaseYear: 1980 },
  { id: "2", title: "Fortnite", genre: "Battle Royale", releaseYear: 2017 },
  { id: "3", title: "Assassins Creed", genre: "Action", releaseYear: 2017 },
  { id: "4", title: "Mario Cart", genre: "Kids Wii Gaming", releaseYear: 2000 }
];

describe("Server", () => {
  describe("GET request to /games", () => {
    it("should return a status code of 200", async () => {
      const response = await request(server).get("/games");
      expect(response.status).toEqual(200);
    });
    it("should return a list of games", async () => {
      const response = await request(server).get("/games");
      expect(response.body).toEqual(games);
    });
    it("should return an array", async () => {
      const response = await request(server).get("/games");
      expect(Array.isArray(games)).toBeTruthy();
    });
  });

  describe("POST request to /games", () => {


    it("should return a status code of 201", async () => {
        const response = await request(server)
          .post("/games")
          .send({ id: "1", title: "Pacman", genre: "Arcade", releaseYear: 1980 });
        expect(response.status).toEqual(201);
      });
      it('should return a status code of 422 if information isnt complete', async () => {
          const response = await request(server).post("/games").send({id: 5, title: "Madden 2018"}); 
          expect(response.status).toEqual(422); 
      });
      it('should return a response body type of JSON', async () => {
          const response = await request(server).post("/games").send({id: 5, title: "Madden 2018", genre: "EA Sports", releaseYear: 2017}); 
          expect(response.type).toEqual('application/json'); 
      });
      it('should return a response body containing the posted data', async () => {
          const body = {id: 5, title: "Madden 2018", genre: "EA Sports", releaseYear: 2017}
          const response = await request(server).post("/games").send(body); 
          expect(response.body).toEqual(body); 
      });
  }); 
});
