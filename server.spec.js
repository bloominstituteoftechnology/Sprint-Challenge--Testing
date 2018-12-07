const request = require('supertest');
const server = require('./api/server');

describe('server', () => {
    describe('POST /games route', () => {
        it('should return status code of 422 if the information is incomplete ', async () => {
            let response = await request(server)
                .post('/games')
                .send({ title: 'GTA5', genre:'Action' })
            expect(response.status).toBe(422);
        })

        it('should return status code of 201 if the information is complete', async () => {
            let response = await request(server)
                .post('/games')
                .send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 })
            expect(response.body).toEqual({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
        })

        it('should return games if the game was successfully added', async () => {
            let response = await request(server)
                .post('/games')
                .send({ title: 'Pacman', genre: 'Arcade', releaseYear:1980 })
            expect(response.status).toBe(201);
        })
    })

    describe('GET /games route', () => {

        it('should return a list of games', async () => {
            const response = await request(server).get('/games');
            const expected = [{ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 }]
            expect(response.body).toBe(expected)
        })

        it('should return a status code of 200', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toBe(200)
        })

        it('should always return an array even if there are no games stored', async () => {
            const response = await request(server).get('/games');
            expect(Array.isArray (response.body)).toBeTruthy();
        })
    })

})