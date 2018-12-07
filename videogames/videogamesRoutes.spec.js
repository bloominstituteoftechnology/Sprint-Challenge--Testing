const request = require('supertest');

const server = require('../api/server.js');

describe('videogamesRoutes.js', () => {
  describe('/api route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/api');

      expect(response.status).toBe(200);
    });
  });
});
