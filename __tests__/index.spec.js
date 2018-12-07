const request = require('supertest');

const server = require('../api/server.js');

describe('server.js', () => {

  describe('/ route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/')
      expect(response.status).toBe(200);
    })

    it('should return application/json', async () => {
      let response = await request(server).get('/')
      // RED TEST: expect(response.type).toBe('application/xml');
      expect(response.type).toBe('application/json');
    })

    it('should return a JSON object from the index route', async () => {
      const expectedBody = { api: 'Ready!' };
        // RED TEST: const expectedBody = { api: 'up' };
      const response = await request(server).get('/');
      expect(response.body).toEqual(expectedBody);
    })
  })

})