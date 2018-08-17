const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
    describe('root endpoint (/)', () => {
        it('should return status code 200 OK', async () => {
            const expected = 200;

            const response = await request(server).get('/');

            expect(response.status).toEqual(expected);
        });

        it('should return JSON', async () => {
            const response = await request(server).get('/');

            expect(response.type).toEqual('application/json');
        });
    });
    describe('server.js', () => {
        describe('root endpoint (/games)', () => {
            it('should return status code 200 OK and the list of games', async () => {
                const expected = 200;

                const response = await request(server).get('/games');

                expect(response.status).toEqual(expected);
                expect(response.body).toEqual([]);
            });
        });
    })

    describe('POST /games', () => {

        it('should return status code 201 OK', async () => {
            const expected = 201;
            const response = await request(server).post('/games').send({ title: 'PW', genre: 'MMO' });
            expect(response.status).toEqual(expected);
        });

        it('should return JSON when new game is created', async () => {
            const expected = { title: 'PW', genre: 'MMO', releaseYear: '2005' };
            const response = await request(server).post('/games').send({ title: 'PW', genre: 'MMO', releaseYear: '2005' });
            expect(response.body).toEqual(expected);
        });
        it('should return status code 422 if the information is incomplete', async () => {
            const expected = 422;
            const response = await request(server).post('/games');
            expect(response.status).toEqual(expected);
        });
    });
});
