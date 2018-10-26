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

    describe('POST /api/games', () => {
        it('should return game title', async () => {
          const testTitle = 'Here is a game';
          
          const expected = { title: 'Here is a game' };
    
          const response = await request(server)
            .post(`/api/games`)
            .send({ testTitle });
    
          expect(response.body).toEqual(expected);
        });
    
        
      });



});

 