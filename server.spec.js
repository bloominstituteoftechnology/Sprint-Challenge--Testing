const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  describe('/ route', () => {
    it('should return a status code of 200', async () => {
      let response = await request(server).get('/');
      expect(response.status).toBe(200);
    });
  });
  describe('/games route', () => {
    describe('GET', () => {
      it('should return a status code of 200', async () => {
        let response = await request(server).get('/games');
        expect(response.status).toBe(200);
      });
      it('should return JSON', async () => {
        let response = await request(server).get('/games');
        expect(response.type).toBe('application/json');
      });
    });
    describe('POST', () => {
      it('should return a status code of 422 if no title or genre', async () => {
        const game = {
          title: 'Final Fantasy VII',
          // genre: 'RPG', // required
          releaseYear: 1997 // not required
        };

        let response = await request(server)
          .post('/games')
          .send(game);
        expect(response.status).toBe(422);
      });

      it('should add new game to db and return list of games', async () => {
        const game = {
          title: 'Final Fantasy VII', // required
          genre: 'RPG', // required
          releaseYear: 1997 // not required
        };
        let response = await request(server)
          .post('/games')
          .send(game);
        expect(response.body).toEqual([
          {
            title: 'Pacman',
            genre: 'Arcade',
            releaseYear: 1980
          },
          {
            title: 'Final Fantasy VII',
            genre: 'RPG',
            releaseYear: 1997
          }
        ]);
      });

      it('should return a status code of 200', async () => {
        const game = {
          title: 'Final Fantasy VII', // required
          genre: 'RPG', // required
          releaseYear: 1997 // not required
        };
        let response = await request(server)
          .post('/games')
          .send(game);
        expect(response.status).toBe(200);
      });
    });
  });
});
