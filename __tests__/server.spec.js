// import dependencies
const request = require('supertest');

// import the server
const server = require('../server');

// group all test in a suite to display on the console
describe('server', () => {
  // group all GET endpoint tests
  describe('GET endpoint (/games)', () => {
    // tests that GET endpoint returns status code 200
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

  // group all POST endpoint tests
  describe('POST endpoint (/games)', () => {
    // tests that POST endpoint returns status code 201 when correct information is sent
    it('should return HTTP status code 201 when correct information is sent', async () => {
      const response = await request(server).post('/games').send({
        title: `No Man's Sky`,
        genre: `MMO Sandbox`,
        releaseYear: 2016,
      });
      expect(response.status).toEqual(201);
    });
    
    // tests that POST endpoint returns status code 422 when incomplete information sent
    it('should return HTTP status code 422 when incomplete information is sent', async () => {
      const response = await request(server).post('/games').send({});
      expect(response.status).toEqual(422);
    });
  });
});