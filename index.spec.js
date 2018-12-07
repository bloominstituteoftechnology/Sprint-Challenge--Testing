const request = require('supertest');
const server = require('./api/server');

describe('server.js', () => {
  describe('POST /games endpoint', () => {
    it('should return status code 200', async () => {
      let response = await request(server)
        .post('/games')
        .send({
          title: 'Pacman',
          genre: 'Arcade',
          releaseYear: 1980,
        });
      expect(response.status).toBe(200);
    });
    it('should return status code 422', async () => {
      let response = await request(server)
        .post('/games')
        .send({
          title: 'Galaga',
          genre: 'Arcade',
        });
      expect(response.status).toBe(422);
    });
    it('should return statement about the game in an object', async () => {
      let response = await request(server)
        .post('/games')
        .send({
          title: 'Galaga',
          genre: 'Arcade',
          releaseYear: 1981,
        });
      expect(response.status).toEqual({ wow: 'Galaga is a great Arcade game from 1981!' });
    });
  });
});
