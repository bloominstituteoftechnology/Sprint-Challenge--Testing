const request = require('supertest');
const server = require('./index.js');

describe('server test(index.js)', () => {
    describe('POST endpoint /games', () => {
        it('it should return a status code 201 CREATED if the request body is valid.', async () => {
            const expected = 201;
            const response = await request(server)
                .post('/games')
                .send({
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                });
            expect(response.status).toEqual(expected);
        });

        it('it should return a status code 422 UNPROCESSABLE ENTITY if the request body is invalid.', async () => {
            const expected = 422;
            const response = await request(server)
                .post('/games')
                .send({
                    releaseYear: 1980
                });
            expect(response.status).toEqual(expected);
        });
    })

    describe('GET endpoint /games', () => {
        it('it should return a status code 200 OK', async () => {
            const expected = 200;
            const response = await request(server)
                                    .get('/games');
            expect(response.status).toEqual(expected);
        })

        it('it should return a list of game', async () => {
            const response = await request(server)
                                    .get('/games');
            expect(typeof response.body).toEqual('number');
        })
    })
})