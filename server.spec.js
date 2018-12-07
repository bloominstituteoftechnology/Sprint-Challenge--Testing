const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  describe('/ route', () => {
    it('should return a status code of 200', async () => {
      let response = await request(server).get('/');
      expect(response.status).toBe(200);
    });
  });
});
