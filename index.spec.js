const request = require('supertest');
const server = require('./api/server.js');

describe('server.js', () => {

    describe('/games route', () => {

        it('should return status code 200', async () => {
            let response = await request(server).get('/games');
            expect(response.status).toBe(200);
        });
        it('should return a response in JSON', async () => {
            let response = await request(server).get('/games');
            expect(response.type).toBe('application/json');
        });
        it('should return an array even if there are no games to send', async () => {
            let response = await request(server).get('/games');
            expect(response.body).toEqual([]);
        });
    }) //end '/ route' describe


    describe('POST /games route', () => {
        it('should return a status code of 201', async () => {
            let response = await request(server).post('/games').send({ title: 'Halo', genre: 'FPS', releaseYear: 2001 });
            expect(response.status).toBe(201);
        });
        it('should return the new list of games', async () => {
            let first = await request(server).post('/games').send({ title: 'Halo', genre: 'FPS', releaseYear: 2001 });
            let response = await request(server).post('/games').send({ title: 'Warcraft III', genre: 'RTS', releaseYear: 2002 });
            expect(response.body).toHaveLength(2);
        });
        it('should return a 422 code if missing information', async () => {
            let response = await request(server).post('/games').send({ title: 'Halo' })
            expect(response.status).toBe(422)
        })
        it('should return a 405 status code if a duplicate title is added', async () => {
            let response = await request(server).post('/games').send({ title: 'Hallo', genre: 'FPS', releaseYear: 2001 });
            expect(response.status).toBe(405);
        })
    }) //end post describe
}) //end server.js describe