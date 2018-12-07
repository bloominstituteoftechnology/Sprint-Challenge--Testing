const request = require('supertest');
const server = require('./api/server.js');
/*
GET /games
The GET /games endpoint should return the list of games and HTTP
 status code 200.
Write a test to make sure this endpoint always returns an array,
 even if there are no games stored. If there are no games to return, 
 the endpoint should return an empty array.
 */

describe('server.js', () => {
    describe('/ route', () => {
        it('should return status code 200', async () => {
            let response = await request(server).get('/');
            expect(response.status).toBe(200);
        });
        it('should return JSON', async () => {
            let response = await request(server).get('/');
            expect(response.type).toBe('application/json');
        });
        it('should return with a body like: { api: "working" }', async () => {
            let response = await request(server).get('/');
            expect(response.body).toEqual({ api: 'working' });
        });
    });
    describe('POST /games route success', () => {
        it('should return status code 201', async () => {
            let response = await request(server)
            .post('/games')
            .send({title: 'Pacman', genre: 'Arcade'});
            expect(response.status).toBe(201)
        });  
    });
    describe('POST /games route error', () => {

        it('genre is required, error 422', async () => {
            let response = await request(server)
            .post('/games')
            .send({title: 'Pacman'});
            expect(response.status).toBe(422)
        });

        it('title is required, error 422', async () => {
            let response = await request(server)
            .post('/games')
            .send({genre: 'Arcade'});
            expect(response.status).toBe(422)
        });
});
});