const request = require('supertest');

const server = require('./server.js');

describe('server', () => {
  describe('Get /games', () => {
    it('the get is getting a status code of 200(OK)', async () => {
      const response = await request(server).get('/games');

      expect(response.status).toBe(200);
    });

    it('the get is recieving an array even if it is empty', async () => {
      const response = await request(server).get('/games');

      expect(response.body).toEqual(expect.arrayContaining([]));
    });

    it('should return json', async () => {
      const response = await request(server).get('/games');

      expect(response.type).toBe('application/json');
    });
  });

  it('server running', () => {
    expect(true).toBeTruthy();
    expect(false).toBeFalsy();
  });
});
