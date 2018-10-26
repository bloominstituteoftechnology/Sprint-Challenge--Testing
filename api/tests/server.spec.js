const request = require('supertest');
const server = require('../server');

describe('server', () => {
  ///////////////////////
  // GET /games endpoint
  ///////////////////////
  describe('GET /games', () => {
    it('should return status code 200(OK)', async () => {
      const response = await request(server).get('/games');

      expect(response.status).toBe(200);
    });

    it('should return json', async () => {
      const response = await request(server).get('/games');

      expect(response.type).toBe('application/json');
    });

    it('should return array in response.body', async () => {
      const response = await request(server).get('/games');

      expect(Array.isArray(response.body)).toBe(true);
    });
  }); // describe GET /games

  ///////////////////////
  // POST /games endpoint
  ///////////////////////
  describe('POST /games', () => {
    it('should return status code 201(Created)', async () => {
      const game = {
        title: 'Space Invaders', // required
        genre: 'Arcade', // required
        releaseYear: 1980, // not required
      };
      const response = await request(server)
        .post('/games')
        .send(game);

      expect(response.status).toBe(201);
    });

    describe('Check for required fields', () => {
      it('should return 422 if title is missing from body', async () => {
        const game = {
          title: '', // required
          genre: 'Arcade', // required
          releaseYear: 1980, // not required
        };
        const response = await request(server)
          .post('/games')
          .send(game);

        expect(response.status).toBe(422);
      });

      it('should return 422 if genre is missing from body', async () => {
        const game = {
          title: 'Zelda', // required
          genre: '', // required
          releaseYear: 1980, // not required
        };
        const response = await request(server)
          .post('/games')
          .send(game);

        expect(response.status).toBe(422);
      });

      it('should return 201 if release year is missing from body', async () => {
        const game = {
          title: 'Donkey kong', // required
          genre: 'Arcade', // required
        };
        const response = await request(server)
          .post('/games')
          .send(game);

        expect(response.status).toBe(201);
      });
    }); // describe Check for required fields

    it('should return status code 405 if duplicate titles', async () => {
      const game = {
        title: 'Pacman',
        genre: 'Arcade',
      };
      const response = await request(server)
        .post('/games')
        .send(game);

      expect(response.status).toBe(405);
    });
  }); // describe POST /games

  describe('GET /games/:id', () => {
    it('should return status 200', async () => {
      const id = 1;
      const response = await request(server).get(`/games/${id}`);

      expect(response.status).toBe(200);
    });

    it('should return game object with id 1', async () => {
      const id = 1;
      const response = await request(server).get(`/games/${id}`);
      const expected = {
        id: 1,
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980, // not required
      };
      expect(response.body).toEqual(expected);
    });

    it('should return status 404 when game with id does not exist', async () => {
      const id = 1123;
      const response = await request(server).get(`/games/${id}`);

      expect(response.status).toEqual(404);
    });
  }); // describe GET /games/:id
}); // describe server
