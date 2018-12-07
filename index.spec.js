const request = require('supertest');

const server = require('./api/server.js');

describe('server', () => {

    it('can respond with status code 200(ok)', async () => {
        const response = await request(server)
            .get('/');
        expect(response.status).toBe(200);
    });

    describe('POST /games', async () => {
        it('respond with a 200 status(ok)', async () => {
            const response = await request(server)
                .post('/games')
                .send({ title: 'Mario', genre: 'Arcade', releaseYear: 1982 });
            expect(response.status).toBe(200);
        });

        it('respond with a 400 status(fail)', async () => {
            const response = await request(server)
                .post('/games')
                .send({ title: ''});
            expect(response.status).toBe(422);
            expect(response.body).toEqual({ message: `Both title and genre are required`})
        });
    })

});


