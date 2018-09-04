const request = require("supertest");

const server = require("./server.js");

describe('server test(server.js)', () => {
    describe('GET endpoint /games', () => {
        it('Should return status code 200 ok', async () => {
            const expected = 200;
            const response = await request(server)
                .get('/games');
            expect(response.status).toEqual(expected);
        })
        it('Should return an empty list of games if there are no games', async () => {
            expected = []
            const response = await request(server)
                .get('/games');
            expect(response.body).toEqual(expected);
        })
        it('Should return a list of games when there are games', async () => {
            await request(server)
                .post('/games')
                .send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
             const expected = [{ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 }]
             const response = await request(server)
                .get('/games');
            expect(response.body).toEqual(expected);
        })
    })
     describe('POST endpoint /games', () => {
        it('Should return status code 422 if there is no game', async () => {
            const expected = 422;
            const response = await request(server)
                .post('/games')
                .send({releaseYear: 1980});
            expect(response.status).toEqual(expected);
        });
        it('Should return a status code 201 if body is valid.', async () => {
            const expected = 201;
            const response = await request(server)
                .post('/games')
                .send({ title: 'Mortal Kombat', genre: 'Arcade', releaseYear: 1992 });
            expect(response.status).toEqual(expected);
        });
        it('Should return status code 405 if duplicate title', async () => {
            const expected = 405;
             const response = await request(server)
            .post('/games')
            .send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
            expect(response.status).toEqual(expected);
        })
    })
}) 