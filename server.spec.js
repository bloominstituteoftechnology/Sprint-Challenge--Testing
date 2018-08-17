const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  describe('POST /games', () => {
    it('should return 200 if the new game has the required fields', async () => {
      const response = await request(server).post('/games')
        .send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 })
        .expect('Content-Type', /json/)
        .expect(201);
    });

    it('should return 422 if the new game does NOT have the required fields', async () => {
      const response = await request(server).post('/games')
        .send({ title: 'Pacman', genre: 'Arcade' })
        .expect('Content-Type', /json/)
        .expect(422);
    });
  });

  describe('GET /games', () => {
    it('should return an array of games', () => {
      const response = await request(server).get('/games')
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it('should return an empty array if no games are stored in the database', () => {
      const response = await request(server).get('/games')
        .expect('Content-Type', /json/)
        .expect(200, []);
    });
  });
});
