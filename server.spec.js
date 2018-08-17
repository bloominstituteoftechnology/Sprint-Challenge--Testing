const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
  describe('root endpoint(/)', () => {
    it('should return status code 200 OK', async () => {
      const expected = 200;
      const response = await request(server)
      .get('/');
      expect(response.status).toBe(expected);
    });
     it('should return JSON', async () => {
      const response = await request(server)
      .get('/');
      expect(response.type).toEqual('application/json');
    });

  describe('get /games', () => {
    it('should return status code 200 ok', async () => {
      const expected = 200;
      const response = await request(server)
      .get('/games')
      expect(response.status).toEqual(expected);
    })

    it('should return a list of games', async () => {
      const expected = server.games;
      const response = await request(server);
      .get('/games')
      expect(response.status).toEqual(expected);
    })

    it('should return an array, even if array is empty', async () => {
      const expected = [];
      const res = await request(server)
      .get('/games')
      expect(response.body).toEqual(expected);
    })
  })
  describe('post /games', () => {
    it('should ')
  })
})
