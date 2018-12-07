const request = require('supertest');

const server = require('../api/server.js');

describe('server.js', () => {

  describe('/ route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/')
      expect(response.status).toBe(200);
    })

    it('should return appliction/json', async () => {
      let response = await request(server).get('/')
      // RED TEST: expect(response.type).toBe('application/xml');
      expect(response.type).toBe('application/json');
    })
  })

})