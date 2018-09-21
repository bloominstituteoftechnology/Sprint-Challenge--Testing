const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
    it('should run the tests', () => {
        expect(true).toBeTruthy();
    });

    describe('POST /games', () => {
        it('returns the correct status code when receiving game data', async () => {
            const response = await request(server)
                .post('/games')
                .send({
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: '1980'
                })
            expect(response.status).toBe(201);
        });

        it('returns status 422 if required fields are not included', async () => {
            const response = await request(server)
                .post('/games')
                .send({
                    title: 'Pacman',
                    releaseYear: '1980'
                })
            expect(response.status).toBe(422);
        });

        it('returns JSON', async () => {
            const response = await request(server)
            .post('/games')
            .send({
                title: 'Pacman',
                releaseYear: '1980'
            })
        expect(response.type).toBe('application/json');
        });
    });
})