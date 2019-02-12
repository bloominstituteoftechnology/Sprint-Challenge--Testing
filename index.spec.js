const request = require('supertest');
const server = require('./api/server.js');


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
    describe('GET/games route success', () => {
        it('should return status code 200', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toBe(200)
        });

        it('the get is receiving an array even if it is empty', async () => {
            const response = await request(server).get('/games');
            expect(response.body).toEqual(expect.arrayContaining([]))
        });
        it('should return JSON', async () => {
            let response = await request(server).get('/games');
            expect(response.type).toBe('application/json');
        });
    });
});