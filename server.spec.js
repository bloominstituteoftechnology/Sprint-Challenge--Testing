const server = require("./server");
const request = require("supertest");

// title and genre are required categories, releaseYear is not required
const games = [
  { id: 1, title: "Pacman", genre: "Arcade", releaseYear: 1980 },
  { id: 2, title: "Fortnite", genre: "Battle Royale", releaseYear: 2017 },
  { id: 3, title: "Assassins Creed", genre: "Action", releaseYear: 2017 },
  { id: 4, title: "Mario Cart", genre: "Kids Wii Gaming", releaseYear: 2000 }
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

  describe("GET request to /games:id", () => {
      it('should return the information about a single game in the response body', async () => {
          const response = await request(server).get("/games/1"); 
          expect(response.body).toEqual({ id: 1, title: "Pacman", genre: "Arcade", releaseYear: 1980 })
      }); 
      it('should return a status code of 200 if the game with the provided ID is sent', async () => {
          const response = await request(server).get("/games/1"); 
          expect(response.status).toEqual(200)
      })
      it('should return a status code of 404 if a game with the provided ID does not exist', async () => {
          const response = await request(server).get("/games/8"); 
          expect(response.status).toEqual(404); 
      })
  })

  describe("POST request to /games", () => {
    it("should return a status code of 201", async () => {
      const response = await request(server)
        .post("/games")
        .send({ title: "PUBG", genre: "Battle Royale", releaseYear: 2018 });
      expect(response.status).toEqual(201);
    });
    it("should return a status code of 422 if information isnt complete", async () => {
      const response = await request(server)
        .post("/games")
        .send({ title: "PUBG" });
      expect(response.status).toEqual(422);
    });
    it("should return a status code of 405 if client tries to duplicate a game that already exists", async () => {
      const response = await request(server)
        .post("/games")
        .send({ title: "Fortnite", genre: "Battle Royale", releaseYear: 2017 });
      expect(response.status).toEqual(405);
    });
    it("should return a response body type of JSON", async () => {
      const response = await request(server)
        .post("/games")
        .send({ title: "Far Cry 5", genre: "EA", releaseYear: 2017 });
      expect(response.type).toEqual("application/json");
    });
    it("should return a response body containing the posted data", async () => {
      //ID has to be set to 7 because post requests start at 5 and two tests before this one increment the index,
      //checking for accurate body response, only test where ID is required in the response obj
      const body = {
        id: 7,
        title: "FallOut 4",
        genre: "EA",
        releaseYear: 2017
      };
      const response = await request(server)
        .post("/games")
        .send(body);
      expect(response.body).toEqual(body);
    });
  });

  describe("DELETE request to /games/:id", () => {
      it('should return a status code of 200 when successfully deleted', async () => {
        const response = await request(server).delete("/games/1");
        expect(response.status).toEqual(200); 
      }); 
      it('should return a status code of 404 if the ID of the game is not found', async () => {
        const response = await request(server).delete("/games/8"); 
        expect(response.status).toEqual(404); 
      }); 
  })
});
