const request = require('supertest');
const server = require('../api/server.js');

describe('server.js', () => {
  describe('GET /', () => {
    it('should return status code 200(OK)', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
    });
    it("should return an array", async () => {
      const getGames = await request(server).get("/api/games");
      expect(Array.isArray(getGames.body)).toBe(true);
    });
  });
  describe('POST', () => {
    it('should create return number of created objects (1)', async () => {
      const gameName = "Butt Trip Bummer";
      const response = await request(server).post(`/api/games/${gameName}`)
      const expected = 1;
      expect(response.body).toBe(expected);
    });
  });
});