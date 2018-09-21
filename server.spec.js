const server = require('./server');
const request = require('supertest');

describe('Server', () => {
    describe('POST to /games', () => {
        it('should return a status code of 200 on success', async () => {
            const response = await request(server)
                .post('/games')
                .send({
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                });
            expect(response.status).toEqual(200);
        });

        it('should return a status code of 422 when missing information', async () => {
            const response = await request(server)
                .post('/games')
                .send({
                    title: 'Super Mario Brothers'
                });
            expect(response.status).toEqual(422);
        });

        it('should return posted data in response body', async () => {
            const expectedBody = {
                id: 7,
                title: 'Duck Hunt',
                genre: 'Arcade',
                releaseYear: 1984
            }
            const response = await request(server)
                .post('/games')
                .send(expectedBody);
            expect(response.body).toEqual(expectedBody);
        });

        it('should return a JSON object', async () => {
            const sendBody = {
                title: 'Marvel vs. Capcom: Infinite',
                genre: 'Fighting',
                releaseYear: 2007
            }
            const response = await request(server)
                .post('/games')
                .send(sendBody);
            expect(response.type).toBe('application/json');
        });

        it('should return a status code of 405 when entering a duplicate title', async () => {
            const sendBody = {
                title: 'Duck Hunt',
                genre: 'Arcade',
                releaseYear: 1984
            }
            const response = await request(server)
                .post('/games')
                .send(sendBody);
            expect(response.status).toEqual(405);
        });
    });

    describe('GET to /games', () => {
        it('should return a status code of 200 on success', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toEqual(200);
        });

        it('should return the array of games including the first', async () => {
            const expectedBody = {id: 1, title: 'Minecraft', genre: 'Sandbox', releaseYear: 2009};
                
            const response = await request(server).get('/games');
            expect(response.body).toContainEqual(expectedBody);
        });

        it('should return type Array', async () => {
            const response = await request(server).get('/games');
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('should return a JSON object', async () => {
            const response = await request(server).get('/games');
            expect(response.type).toBe('application/json');
        })
    });

    describe('GET to /game/:id', () => {
        it('should return a status code of 200 on success', async () => {
            const response = await request(server).get('/games/1');
            expect(response.status).toEqual(200);
        });

        it('should return the first item in the array', async () => {
            const expectedBody = {id: 1, title: 'Minecraft', genre: 'Sandbox', releaseYear: 2009};
            const response = await request(server).get('/games/1');
            expect(response.body).toEqual(expectedBody);
        });

        it('should return a status code of 404 when ID is not found', async () => {
            const response = await request(server).get('/games/2000000');
            expect(response.status).toEqual(404);
        });

        it('should return a JSON object', async () => {
            const response = await request(server).get('/games/1');
            expect(response.type).toBe('application/json');
        });
    });

    describe('DELETE to /games/:id', () => {
        it('should return a status code of 200 on success', async () => {
            const response = await request(server).delete('/games/8');
            expect(response.status).toEqual(200);
        });

        it('should return an ID of the deleted item', async () => {
            const response = await request(server).delete('/games/7');
            expect(response.body).toEqual({id: '7'});
        });

        it('should return a status code of 404 if the ID is not found', async () => {
            const response = await request(server).delete('/games/2000000');
            expect(response.status).toEqual(404);
        });

        it('should return a JSON object', async () => {
            const response = await request(server).delete('/games/6');
            expect(response.type).toBe('application/json');
        })
    })
});
