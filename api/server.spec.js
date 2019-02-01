const request = require('supertest');
const server = require('./server.js');

describe('server.js testing', () => {

    describe('testing /games GET endpoint', () => {

        it('should respond with status code 200 OK', async () => {
            let response = await request(server).get('/games');
      
            expect(response.status).toBe(200);
        });

        it('should always return an array, even if there are no games stored', async () => {

            let response = await request(server).get('/games');
            
            let games = await response.body;
            
            const expected = games.map(game => game);

            expect(games).toEqual(expected);
        });

        it('should respond with JSON', async () => {
            let response = await request(server).get('/games');
      
            expect(response.type).toMatch(/json/i);
        });

    });

});