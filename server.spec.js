const request = require('supertest');
const server = require('./server');

describe('server.js', () => {
    describe('GET games', () => {
        it('should return a 200 status code', () => {
            const response = request(server).get('/games');
            expect(response.status).toBe(200);
        });

        it('should return an array', () => {
            const response = request(server).get('/games');
            expect(typeof response.body).toBe('array');
          });

        it('should return a list of games', () => {
            const response = request(server).get('/games');
            const expected = [
                { 
                    id: 1,
                    title: 'Pacman', 
                    genre: 'Arcade', 
                    releaseYear: 1980
                }
            ]
            expect(response.body).toEqual('expected');
        });
    });
});