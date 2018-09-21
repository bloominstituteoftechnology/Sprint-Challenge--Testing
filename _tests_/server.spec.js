const server = require('../server');
const request = require('supertest');

describe('server.js', () => {
    describe('GET /games', () => {
        it('status code should be 200', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toBe(200);
        });
        it('should return a list of games', async () => {
            const response = await request(server).get('/games');
            const expectedBody =  [
                { name: 'MHW' , genre: 'JRPG' },
                { name: 'AC Odyssey', genre: 'RPG' },
                { name: 'Marvel\'s Spiderman' , genre: 'RPG' }
        ]
            expect(response.body).toEqual(expectedBody);
        });
        it('should check if type of response is array', async () => {
            const response = await request(server).get('/games');
            expect(Array.isArray(response.body)).toBe(true);
        })
        it('should return an empty array if there are no games stored', async () => {
            const response = await request(server).get('/');
            if ( !response.body ) {
                expect(response.body).toBe([]);
            }
        });
    });
    
    describe('POST /games', () => {
        it('status code should be 422 if information is insufficient', async () => {
            const response = await request(server)
                .post('/games')
                .send({ 'genre': "MOBA" });
            expect(response.status).toBe(422);
        });
        it('should add a new game to the list of games', async () => {
            const response = await request(server)
                .post('/games')
                .send({ name: "Horizon Zero Dawn", genre: "RPG" });
            const expectedBody =  [
                { name: 'MHW' , genre: 'JRPG' },
                { name: 'AC Odyssey', genre: 'RPG' },
                { name: 'Marvel\'s Spiderman' , genre: 'RPG' },
                { name: "Horizon Zero Dawn", genre: "RPG" }
            ];
            expect(response.body).toEqual(expectedBody);
        });
        it('status code should be 201', async () => {
            const response = await request(server)
                .post('/games')
                .send({ name: "Horizon Zero Dawn", genre: "RPG" });
            expect(response.status).toBe(201);
        });
    });
})
