const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  describe('GET /', () => {
    it('should return a JSON object', async () => {
      const expected = { message: 'API running' };

      const response = await request(server).get('/');

      expect(response.body).toEqual(expected);
    });
  });
  describe('GET /games', () => {
    it('should return a status code of 200 ', async () => {
      const expectedStatus = 200;

      const response = await request(server).get('/games');

      expect(response.status).toEqual(expectedStatus);
    });
    it('should always return an array', async () => {
      const expected = [];

      const response = await request(server).get('/games');
      expect(response.body).toEqual(expected);
    });
    it('should return a list of games', async () => {
      const expectedArray = [
        { title: 'Pacman', genre: 'Arcade', releaseYear: 1980 }
      ];

      await request(server)
        .post('/games')
        .send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });

      const response = await request(server).get('/games');

      expect(response.body).toEqual(expectedArray);
    });
  });
  describe('POST /games', () => {
    it('should return all the games if added', async () => {
      const expected = [
        { title: 'Pacman', genre: 'Arcade', releaseYear: 1980 },
        { title: 'League of Legends', genre: 'MOBA', releaseYear: 2000 }
      ];

      const response = await request(server)
        .post('/games')
        .send({ title: 'League of Legends', genre: 'MOBA', releaseYear: 2000 });

      expect(response.body).toEqual(expected);
    });
    it('should return the correct status code if successfully added', async () => {
      const expected = 201;

      const response = await request(server)
        .post('/games')
        .send({
          title: 'The new game',
          genre: 'Action'
        });

      expect(response.status).toEqual(expected);
    });
    it('should return the correct status code if there is missing info', async () => {
      const expected = 422;

      const response = await request(server)
        .post('/games')
        .send({
          title: 'League of Legends'
        });

      expect(response.status).toEqual(expected);
    });
  });
});
