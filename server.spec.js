const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  describe('POST /games', () => {
    it('should return 200 if the new game has the required fields', async () => {
      await request(server)
        .post('/games')
        .send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 })
        .expect('Content-Type', /json/)
        .expect(201);
    });

    it('should return 422 if the new game does NOT have the required fields', async () => {
      await request(server)
        .post('/games')
        .send({ title: 'Pacman', genre: 'Arcade' })
        .expect('Content-Type', /json/)
        .expect(422);
    });
  });

  describe('GET /games', () => {
    it('should return an array of games', async () => {
      await request(server)
        .get('/games')
        .expect('Content-Type', /json/)
        .expect(200, [{ id: 1, title: 'Pacman', genre: 'Arcade', releaseYear: 1980 }]);
    });

    it('should always return an array', async () => {
      await request(server)
        .get('/games')
        .then(response => {
          typeof response === 'array';
      });
    });
  });

  describe('GET /games/:id', () => {
    it('should return a specific game', async () => {
      await request(server)
        .get('/games/1')
        .expect('Content-Type', /json/)
        .expect(200, { id: 1, title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
    });

    it('should return 404 when a game is not found', async () => {
      await request(server)
        .get('/games/2')
        .expect('Content-Type', /json/)
        .expect(404);
    });
  });
});
