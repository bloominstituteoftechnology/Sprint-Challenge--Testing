// import dependencies
const request = require('supertest');

// import the server
const server = require('../server');

// group all test in a suite to display on the console
describe('server', () => {
  // group all GET endpoint test
  describe('GET endpoint (/games)', () => {
    // tests that GET endpoint returns correct status code
    it('should return HTTP status code 200', async () => {
      const response = await request(server).get('/games');
      expect(response.status).toEqual(200);
    });

    // tests that GET endpoint returns an array, with or without any items
    it('should return an array', async () => {
      const response = await request(server).get('/games');
      expect(Array.isArray(response.body)).toBe(true);
    })
  });
});