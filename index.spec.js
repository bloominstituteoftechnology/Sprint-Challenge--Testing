// NODE MODULES, FILE IMPORTS, CONSTANTS
// ==============================================
const req = require('supertest');

const app = require('./index.js');

const games = [
  { id: 1, title: 'Halo: Combat Evolved', genre: 'FPS', releaseYear: 2001 },
  { id: 2, title: 'Fortnite', genre: 'Battle Royale', releaseYear: 2017 },
  { id: 3, title: 'God Of War', genre: 'Action Adeventure', releaseYear: 2018 }
];

const game = {
  title: 'Red Dead Redemption 2',
  genre: 'Western Action Adventure',
  releaseYear: 2018
};

const brokenGame = { title: 'LoL' };

// TESTS
// ==============================================
describe('index.js', () => {
  describe('get /games route', () => {
    it('should return a status code of 200', async () => {
      const res = await req(app).get('/api/games');
      expect(res.status).toBe(200);
    });

    it('should return an array', async () => {
      const res = await req(app).get('/api/games');
      expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('should return a list of games', async () => {
      const res = await req(app).get('/api/games');
      expect(res.body).toEqual(games);
    });
  });

  describe('post /games route', () => {
    it('should return a status code of 400 when there is not enough information', async () => {
      const res = await req(app)
        .post('/api/games')
        .send(brokenGame);
      expect(res.status).toBe(400);
    });

    it('should return a status code of 201 when successfully added', async () => {
      const res = await req(app)
        .post('/api/games')
        .send(game);
      expect(res.status).toBe(201);
    });

    it('should return a status code of 404 for duplicates', async () => {
      const res = await req(app)
        .post('/api/games')
        .send(game);
      expect(res.status).toBe(404);
    });
  });
});
