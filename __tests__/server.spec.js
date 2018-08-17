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
  });
});