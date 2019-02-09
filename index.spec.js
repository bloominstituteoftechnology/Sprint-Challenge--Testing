const request = require('supertest');
const server = require('./api/server');

describe('server.js', () => {
  describe('/games endpoint POST', () => {
    it('should return status 422', async () => {
      const game = {
        title: 'FIFA-19',
        releasedYear: 2019
      };
      const response = await request(server).post(game);
      expect(response.status).toBe(422);
    });
  });
});
