// import dependencies
const request = require('supertest');

// import the server
const server = require('../server');

// group all test in a suite to display on the console
describe('server', () => {
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
    })
    
    // tests that POST endpoint returns status code 422 when incomplete information sent
    it('should return HTTP status code 422 when incomplete information is sent', async () => {
      const response = await request(server).post('/games').send({});
      expect(response.status).toEqual(422);
    })

    // tests to ensure POST endpoint only accepts unique titles
    it('should return HTTP status code 405 if title is not unique', async () => {
      const response = await request(server).post('/games').send({
        title: `No Man's Sky`,
        genre: `MMO Sandbox`,
        releaseYear: 2016,
      });
      expect(response.status).toEqual(405);
    })
  })

  // group all GET endpoint tests
  describe('GET endpoint (/games)', () => {
    // tests that GET endpoint returns status code 200
    it('should return HTTP status code 200', async () => {
      const response = await request(server).get('/games');
      expect(response.status).toEqual(200);
    })

    // tests that GET endpoint returns an array, with or without any items
    it('should return an array', async () => {
      const response = await request(server).get('/games');
      expect(Array.isArray(response.body)).toBe(true);
    })
  })

  // group all GET/:id endpoint tests
  describe('GET endpoint(/games/:id', () => {
    // test that GET/:id returns status code 200 when game is found
    it('should return HTTP status code 200 when game is found by id', async () => {
      const response = await request(server).get('/games/1');
      expect(response.status).toEqual(200);
    })

    // test that GET/:id returns status code 404 when game not found
    it('should return HTTP status code 404 when game not found', async () => {
      const response = await request(server).get('/games/2');
      expect(response.status).toEqual(404);
    })
  })

  // group all DELETE/:id endpoint tests
  describe('DELETE endpoint (/games/:id)', () => {
    // test that DELETE/:id returns status code 200 when game is deleted
    it('should return HTTP status code 200 when game is deleted', async () => {
      const response = await request(server).delete('/games/1');
      expect(response.status).toEqual(200);
    })

    // test that DELETE/:id returns status code 404 if game not found
    it('should return HTTP status code 404 if game not found', async () => {
      const response = await request(server).delete('/games/2');
      expect(response.status).toEqual(404);
    })
  })
})