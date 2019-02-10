const request = require('supertest');
const server = require('./api/server');
const db = require('./dbConfig');

describe('server.js', () => {
  describe('/games endpoint POST', () => {
    it('should return 201 status code', async () => {
      const game = {
        title: 'FIFA-19',
        genre: 'Sports'
      };
      const response = await request(server)
        .post('/games')
        .send(game);
      expect(response.status).toBe(201);
    });
    it('should return status 422 when missing genre', async () => {
      const game = {
        title: 'FIFA-19',
        releaseYear: 2019
      };
      const response = await request(server)
        .post('/games')
        .send(game);
      expect(response.status).toBe(422);
    });
    it('should return status 422 when missing title', async () => {
      const game = {
        genre: 'Sports'
      };
      const response = await request(server)
        .post('/games')
        .send(game);
      expect(response.status).toBe(422);
    });
  });
  describe('/games endpoint GET', () => {
    it('should return array with games and status 200', async () => {
      const response = await request(server).get('/games');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });
});
