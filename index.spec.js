const request = require('supertest');

const server = require('./api/server.js');

describe('server', () => {

    it('can respond with status code 200(ok)', async () => {
        const response = await request(server)
            .get('/');
        expect(response.status).toBe(200);
    });

    describe('POST /games', async () => {
        it('responds with a 200 status(ok)', async () => {
            const response = await request(server)
                .post('/games')
                .send({ title: 'Mario', genre: 'Arcade', releaseYear: 1982 });
            expect(response.status).toBe(200);
        });

        it('responds with a 422 status(fail)', async () => {
            const response = await request(server)
                .post('/games')
                .send({ title: '' });
            expect(response.status).toBe(422);
            expect(response.body).toEqual({ message: `Both title and genre are required` })
        });

        it('Should create a new game w/o release year', async () => {
            const response = await request(server)
                .post('/games')
                .send({ title: 'Street Fighter', genre: 'Arcade' });
            expect(response.status).toBe(200);
        });
    });

    describe('GET /games', async () => {
        it('responds with a 200 status(ok) and array of all games', async () => {
            const response = await request(server)
                .get('/games')
            expect(response.status).toBe(200)
            expect(response.body).toEqual([
                {
                title: 'Pacman', // required
                genre: 'Arcade', // required
                releaseYear: 1980 // not required
            },
            {
                title: 'Contra', // required
                genre: 'Arcade', // required
                releaseYear: 1981 // not required
            },
            {
                title: 'Commando', // required
                genre: 'Arcade', // required
                releaseYear: 1982 // not required
            },
            {
                title: 'Mario', // required
                genre: 'Arcade', // required
                releaseYear: 1982 // not required
            },
            {
                title: 'Street Fighter', // required
                genre: 'Arcade', // required
            },
            ]);
        });
    });
});


