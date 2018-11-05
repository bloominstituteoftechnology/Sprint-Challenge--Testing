const server = require('./api/server.js');
const request = require('supertest');

describe('server', () => {
    describe('GET /', () => {
        it('should return status code 200(OK)', async () => {
          const response = await request(server).get('/');
          expect(response.status).toBe(200);
        });

        it('should return JSON', async () => {
            const response = await request(server).get('/');
      
            expect(response.type).toBe('application/json');
        });
      
        it('should return { message: "server is running" }', async () => {
          const response = await request(server).get('/');
      
          expect(response.body).toEqual({ message: 'server is running' });
        });
    });

    describe('POST /games', () => {
        it('should return the new game object if a valid game object is posted', async () => {
          const testGame = {
              title: 'FIFA',
              genre: 'Sports',
              releaseYear: 2000
          };
    
          const response = await request(server)
            .post(`/games`)
            .send(testGame);
    
          expect(response.body).toEqual(testGame);
        });

      it(`should return error if no title provided`, async () => {
        const testGame = {
          title: null,
          genre: 'Sports',
          releaseYear: 2000
        };

        const response = await request(server)
          .post(`/games`)
          .send(testGame);
        
        expect(response.body).toEqual('Error: No game title provided');
      });

      it(`should return error if releaseYear input is not a number`, async () => {
        const testGame = {
          title: 'FIFA',
          genre: 'Sports',
          releaseYear: '2000'
        };

        const response = await request(server)
          .post(`/games`)
          .send(testGame);
        
        expect(response.body).toEqual('Error: Release Year must be a number');
      });
    });
});

 