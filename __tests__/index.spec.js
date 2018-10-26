const server = require('../server.js');
const request = require('supertest');

describe('test suites for basic API operations', () => {
  describe('GET tests', () => {
    test('should return games list as an array', async () => {
      const response = await request(server).get('/');
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
