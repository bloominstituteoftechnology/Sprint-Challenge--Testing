const request = require('supertest');
const server = require('./server');

describe('GET /games tests', () => {
  it('should return status 200', async () => {
    const res = await request(server).get('/games');
    expect(res.status).toBe(200);
  });
  it('should return an array', async () => {
    const res = await request(server).get('/games');
    expect(Array.isArray(res.body)).toBe(true);
  });
  it('should return an array if empty', async () => {
    const res = await request(server).get('/games');
    expect(res.body).toEqual([]);
  });
});

describe('POST /games tests', () => {
  it('should return status 201', async () => {
    const res = await request(server)
      .post('/games')
      .send({
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980
      });
    expect(res.status).toBe(201);
  });
  it('should return status 422 if missing game title', async () => {
    const res = await request(server)
      .post('/games')
      .send({
        title: '',
        genre: 'Arcade',
        releaseYear: 1980
      });
    expect(res.status).toBe(422);
  });
  it('should return status 422 if missing game genre', async () => {});
});
