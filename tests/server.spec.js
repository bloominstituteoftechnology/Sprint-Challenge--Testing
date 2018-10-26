const request = require('supertest');
const server = require('../api/server.js');

describe('server.js', () => {
  describe('GET /', () => {
    it('should return status code 200', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
    });
  });
  describe('GET /api/games', () => {
    it("should return true if an array was returned", async () => {
      const response = await request(server).get("/api/games");
      expect(Array.isArray(response.body)).toEqual(true);
    });
    it('should return an array of games', async () => {
      const game = { title: "Jupiter Jacks", genre: "RPG", releaseYear: "1994" };
      await request(server).post(`/api/games`).send(game);
      const response = await request(server).get("/api/games");
      expect(response.body).toEqual([game]);
    });
    it("should return 200 if get was successful ", async () => {
      const response = await request(server).get("/api/games");
      expect(response.status).toBe(200);
    });
  });
  describe('POST /api/games', () => {
    it('should return number of created objects', async () => {
      const game = { title: "Pacman", genre: "Arcade", releaseYear: "1980" };
      const response = await request(server).post(`/api/games`).send(game)
      const expected = 1;
      expect(response.body).toBe(expected);
    });
    it('should return 201 if object was created', async () => {
      const game = { title: "Pacman", genre: "Arcade", releaseYear: "1980" };
      const response = await request(server).post(`/api/games`).send(game)
      const expected = 201;
      expect(response.status).toBe(expected);
    });
    it('should return 422 if no body exists', async () => {
      const response = await request(server).post(`/api/games`).send()
      const expected = 422;
      expect(response.status).toBe(expected);
    });
  });
  // describe('PUT /api/games', () => {
  //   it('should create return number of edited objects (1)', async () => {
  //     const gameName = "Butt Trip Bummer";
  //     const response = await request(server).post(`/api/games/${gameName}`)
  //     const expected = 1;
  //     expect(response.body).toBe(expected);
  //   });
  // });
});