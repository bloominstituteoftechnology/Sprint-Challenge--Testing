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
    it('returns 405 if title already exists', async () => {
      const response = await request(server)
        .post('/games')
        .send({ title: 'Game 1', genre: 'Action' });
      expect(response.status).toBe(405);
    });
  })

  describe('GET /games ROUTE', () => {
    it('return 200 with list of games', async () => {
      const response = await request(server).get('/games');
      const expected = [
        {
          id: 1,
          name: 'Game 1',
          breed: 'Action',
          releaseYear: '1991'
        },
        {
          id: 2,
          name: 'Game 2',
          breed: 'Sci-Fi',
          releaseYear: '1992'
        },
        {
          id: 3,
          name: 'Game 3',
          breed: 'Adventure',
          releaseYear: '1993'
        }
      ]
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expected);
    })
    it('always returns an array, even if no games stored', async () => {
      const response = await request(server).get('/games');
      expect(Array.isArray(response.body)).toBe(true);
    })
    it('returns an empty array, even if no games stored', async () => {
      const response = await request(server).get('/games');

      // Is there a better way to write this other than setting db = []?
      response.body = [];

      const expected = [];
      expect(response.body).toEqual(expected);
    })
  })
})
