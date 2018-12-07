const request = require('supertest');

const server = require('./server.js')

const completeGame = {
    title: 'Fortnite',
    genre: 'Survival',
    releaseYear: '2017'
}

const incompleteGame = {
    title: 'Fortnite'
}

describe('server.js', () => {
    describe('get / route', () => {
        test('returns status code 200', async () => {
            let response = await request(server).get('/');
            expect(response.status).toBe(200);
        });
        test('returns JSON', async () => {
            let response = await request(server).get('/');
            expect(response.type).toBe('application/json');
        });
        test('returns body { api: "up" }', async () => {
            let response = await request(server).get('/');
            expect(response.body).toEqual({ api: 'up' });
        });
    });

    describe('post /games route', () => {
        test('returns json', async () => {
            let response = await request(server)
                .post('/games')
                .send(completeGame);
            expect(response.type).toBe('application/json');
        });
        test('returns status code 201 if successful', async () => {
            let response = await request(server)
                .post('/games')
                .send(completeGame);
            expect(response.status).toBe(201);
        });
        test('returns status code 422 if incomplete', async () => {
            let response = await request(server)
                .post('/games')
                .send(incompleteGame);
            expect(response.status).toBe(422);
        });
    });

    describe('get /games route', () => {
        test('returns array', async () => {
            let response = await request(server).get('/games');
            expect(typeof response.body === 'object').toBeTruthy();
        });
        test('returns json', async () => {
            let response = await request(server).get('/games');
            expect(response.type).toBe('application/json');
        })
        test('returns status code 200 if successful', async () => {
            let response = await request(server).get('/games');
            expect(response.status).toBe(200);
        });
    });
});