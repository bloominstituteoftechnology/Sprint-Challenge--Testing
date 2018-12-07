const request = require('supertest');
const games = require('./games.js');
const server = require('./api/server.js');

describe('server.js', () => {
    describe('/', () => {
        it('should return a status 200', async () => {
            let response = await request(server).get('/games');

            expect(response.status).toBe(200);
        })

        it('should return JSON', async () => {
            let response = await request(server).get('/games');

            expect(response.type).toBe('application/json');
        });

        it('should return a empty array', async () => {
            const expectedBody = [];
            let response = await request(server).get('/games');

            expect(response.body).toEqual(expectedBody);
            expect(response.status).toBe(200);
        });
    })

    describe('POST /addGame', () => {
        it('should return a status code 404', async () => {
            let response = await request(server).get('/addGame');

            expect(response.status).toBe(404);
        });

        it('should return a game', async () => {
            const game = [
                'Pac-man',
                'arcade',
                 1980,
              ];

              expect(game).toContain('Pac-man');
        });

        it('should add a game', async () => {
            let response = await request(server)
                .post('/addGame')
                .send({ title: 'Final Fantasy 7', genre: 'RPG', releaseYear: 1997 });

            expect(response.body).toEqual({ Game: 'Final Fantasy 7 RPG 1997' });
        });
    })
    
})