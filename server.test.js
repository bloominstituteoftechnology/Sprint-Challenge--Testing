const request = require('supertest');
const server = require('./server.js');

describe('server', () => {
  it('can run tests', () => {
    expect(1).toBeTruthy();
  })

  describe('POST /games ROUTE', () => {
    it('has title and genre fields included', async () => {
      const response = await request(server)
        .post('/games')
        .send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
      expect(response.body.title).toBeDefined;
      expect(response.body.genre).toBeDefined;
    })
    it('returns 422 if title and genre is incomplete', async () => {
      const response = await request(server)
        .post('/games')
        .send({ title: 'Pacman' });
      expect(response.status).toBe(422);
    })
    it('returns 201 with correct game data types', async () => {
      const response = await request(server)
        .post('/games')
        .send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
      expect(response.status).toBe(201);
    })
    it('returns 500 with incorrect game data types', async () => {
      const response = await request(server)
        .post('/games')
        .send({ title: 123, genre: 234, releaseYear: 1980 });
      expect(response.status).toBe(500);
    })
  })
})
