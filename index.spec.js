// NODE MODULES, FILE IMPORTS
// ==============================================
const req = require('supertest');

const app = require('./index.js');

const games = [
  { id: 1, title: 'Halo: Combat Evolved', genre: 'FPS', releaseYear: 2001 },
  { id: 2, title: 'Fortnite', genre: 'Battle Royale', releaseYear: 2017 },
  { id: 3, title: 'God Of War', genre: 'Action Adeventure', releaseYear: 2018 }
];

// TESTS
// ==============================================
describe('index.js', () => {
  describe('/games route', () => {
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
});
