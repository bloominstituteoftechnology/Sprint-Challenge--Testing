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

    describe('GET /games', () => {
        it('returns status code 200 (OK)', async () => {
            const response = await request(server).get('/games');

            expect(response.status).toBe(200);
        });

        it('returns the list of games as an array', async () => {
            // await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade', releaseYear: '1980' });
            const response = await request(server).get('/games');

            expect(response.body).toEqual(['Pacman']);
        });

        it('returns an empty array if list of games is empty', async () => {
            await request(server).delete('/games');
            const response = await request(server).get('/games');

            expect(response.body).toEqual([]);
        });
    })
})