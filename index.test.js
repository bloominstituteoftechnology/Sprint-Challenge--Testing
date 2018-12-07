const request = require('supertest');

const server = require('./api/server.js');


describe('server.js', () => {
  describe('/games route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/games');
      expect(response.status).toBe(200);
    });

    it('should return a response in JSON', async () => {
      let response = await request(server).get('/games');
      expect(response.type).toBe('application/json');
    });

    it('should return an array even if there are no games to send', async () => {
      let response = await request(server).get('/games');
      expect(response.body).toBe([]);
    });
  }) //end '/ route' describe
    describe('POST /games route', () => {
      it('should return a status code of 201', async () => {
        let response = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });

        expect(response.status).toBe(201);
      });

      it('should return the new list of games', async () => {
        let first = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
        let response = await request(server).post('/games').send({ title: 'Frogger', genre: 'Arcade', releaseYear: 1981 });
        expect(response.body).toHaveLength(2);
      });

      it('should return a 422 code if a game already exists', async () => {
        let first = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
        let response = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade' });

        expect(response.status).toBe(422)
      })
    }) //end post describe

}) //end server.js describe
