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
      expect(response.body).toEqual([]);
    });
  }) //end '/ route' describe
    describe('POST /games route', () => {
      it('should return a status code of 201', async () => {
        let response = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });

        expect(response.status).toBe(201);
      });

      it('should return the new list of games', async () => {
        let first = await request(server).post('/games').send({ title: 'Galaga', genre: 'Arcade', releaseYear: 1981 });
        let response = await request(server).post('/games').send({ title: 'Frogger', genre: 'Arcade' });
        expect(response.body).toHaveLength(3);
      });

      it('should return a 422 code if missing information', async () => {
        let response = await request(server).post('/games').send({ title: 'Pacman' });
        expect(response.status).toBe(422)
      });

      it('should return a 405 status code if a duplicate title is added', async () => {
        let response = await request(server).post('/games').send({ title: 'Frogger', genre: 'Arcade', releaseYear: 1981 });
        expect(response.status).toBe(405);
      })
    }) //end post describe
    describe('GET /games/:id route', () => {
      //test should have added 3 games with ids 1-3
      it('should return a status code of 200', async () => {
        let response = await request(server).get('/games/1').send();

        expect(response.status).toBe(200);
      });

      it('should return a single game', async () => {
        let response = await request(server).get('/games/1').send();
        expect(response.body).toHaveLength(1);
      });

      it('should return a 404 code if there is no game with that id', async () => {
        let response = await request(server).get('/games/5').send();
        expect(response.status).toBe(404)
      });
    }) //end get id describe
    describe('DELETE /games/:id route', () => {
      it('should return a status code of 204', async () => {
        //tests have added 3 games, and they should have ids 1-3
        let response = await request(server).delete('/games/2').send();
        expect(response.status).toBe(204);
      });

      it('should return a 404 code if there is no game with that id', async () => {
        let response = await request(server).delete('/games/5').send();
        expect(response.status).toBe(404)
      });
      it('should only delete specified game', async () => {
        let response = await request(server).get('/games').send();
        //we added three games and deleted one.
        expect(response.body).toHaveLength(2); 
      })
    }) //end delete id describe
}) //end server.js describe
