const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
    describe('GET /games', () => {
        it('should return status code 200 OK', async () => {
            const expected = 200;

            const response = await request(server).get('/games');

            expect(response.status).toEqual(expected);
        });

        it('should always return an array', async () => {
            const expected = [];

            const response = await request(server).get('/games');

            expect(response.body).toEqual(expected);
        });
    });

    describe('POST /games', () => {
        it('should return a 422 status code if information is incomplete', () => {
            const expected = 422;
            
            const response = await request(server).post('/smurfs').send({title: 'Pacman', genre: 'Arcade'});

            expect(response.status).toEqual(expected);
        })

        it('should return a 201 status code if information is correct', () => {
            const response = await request(server).post('/smurfs').send({title: 'Pacman', genre: 'Arcade', releaseYear: 1980});

            expect(response.status).toEqual(expected);
        })
    })
});