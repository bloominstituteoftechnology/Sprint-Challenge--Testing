const request = require('supertest');
const server = require('../server.js');


describe('server.js', () => {
  describe('index route', () => {
    it('should 404', async () => {
      const expectedStatusCode = 404;
      const response = await request(server).get('/');
      expect(response.status).toEqual(expectedStatusCode);
    });
    it('should respond with warning message ', async () => {
      const response = await request(server).get('/');
      expect(response.body).toEqual(expect.objectContaining({
        errorMessage: expect.stringMatching('You probably want to use a different endpoint')
      }));
    });
  });
})