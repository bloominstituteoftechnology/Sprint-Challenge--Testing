const request = require('supertest');
const server = require('./server.js');
const games = require('./db');

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
      it('should always return an array', async () => {
        let response = await request(server).get('/games');
        expect(Array.isArray(response.body)).toBe(true);
      });
    });
    describe('POST', () => {
      it('should add new game to db and return list of games', async () => {
        let game = {
          title: 'Final Fantasy VII', // required
          genre: 'RPG', // required
          releaseYear: 1997 // not required
        };
        let response = await request(server)
          .post('/games')
          .send(game);
        expect(response.body).toEqual([
          {
            id: 0,
            title: 'Pacman',
            genre: 'Arcade',
            releaseYear: 1980
          },
          {
            id: 1,
            title: 'Final Fantasy VII',
            genre: 'RPG',
            releaseYear: 1997
          }
        ]);
        game = {
          title: 'Crash Bandicoot: Warped',
          genre: 'Platform game',
          releaseYear: 1998
        };
        response = await request(server)
          .post('/games')
          .send(game);
        expect(response.body).toEqual([
          {
            id: 0,
            title: 'Pacman',
            genre: 'Arcade',
            releaseYear: 1980
          },
          {
            id: 1,
            title: 'Final Fantasy VII',
            genre: 'RPG',
            releaseYear: 1997
          },
          {
            id: 2,
            title: 'Crash Bandicoot: Warped',
            genre: 'Platform game',
            releaseYear: 1998
          }
        ]);
      });

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

      it('should return a status code of 405 if no title is not unique', async () => {
        const game = {
          title: 'Pacman',
          genre: 'RPG',
          releaseYear: 1997
        };
        let response = await request(server)
          .post('/games')
          .send(game);
        expect(response.status).toBe(405);
      });

      it('should return a status code of 200', async () => {
        const game = {
          title: 'Age of Empires II', // required
          genre: 'Real-time strategy', // required
          releaseYear: 1999 // not required
        };
        let response = await request(server)
          .post('/games')
          .send(game);
        expect(response.status).toBe(200);
      });
    });
    describe('GET /:id', () => {
      it('should return a status code of 200', async () => {
        let response = await request(server).get('/games/0');
        expect(response.status).toBe(200);
      });
      it('should return a status code of 404 if no id', async () => {
        let response = await request(server).get('/games/44');
        expect(response.status).toBe(404);
      });
      it('should return JSON', async () => {
        let response = await request(server).get('/games/0');
        expect(response.type).toBe('application/json');
      });
      it('should return a single game object', async () => {
        let response = await request(server).get('/games/0');
        expect(response.body).toEqual({
          id: 0,
          title: 'Pacman',
          genre: 'Arcade',
          releaseYear: 1980
        });
      });
    });
  });
});
