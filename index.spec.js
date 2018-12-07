const request = require('supertest');
const server = require('./api/server.js');

describe('server.js', () => {
  // R O O T   R O U T E
  describe('root route', () => {
    it('should send back a 200', async () => {
      let response = await request(server).get('/');
      expect(response.status).toBe(200);
    });

    it('should return JSON', async () => {
      let response = await request(server).get('/');

      expect(response.type).toBe('application/json');
    });
  });
});
