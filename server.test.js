
const request = require('supertest')

const server = require('./server.js')

describe('routeHandlers', () => {
    describe('/get games', () => {

        it('responds with status 200', async () => {
            const response = await request(server).get('/games');

            expect(response.status).toBe(200);
        })

        it('responds with JSON', async () => {
            const response = await request(server).get('/games');

            expect(response.type).toMatch(/json/i);
        })

        it('sends back correct type', async () => {
            const response = await request(server).get('/games');

            expect(typeof response.body).toBe('array');
        })

        it('sends back correct items', async () => {
            const response = await request(server).get('/games');

            expect(response.body).toEqual([]);
        })
    })

    describe('/post games', () => {

        it('responds with status 201', async () => {
            const body = {title: 'Tetris', genre: 'arcade', yearReleased: 1984}
            const response = await request(server).post('/games').send(body);
            const missing = ['title', 'genre'].filter(item => {return response.hasOwnProperty(item) === false})

            expect(response.status).toBe(201);
            expect(response.body.length).toBe(1);
            expect(missing.length).toBe(0);

        })

        it('responds with status 400', async () => {
            const body = {}
            const response = await request(server).post('/games').send(body);

            expect(response.status).toBe(400);
        })

        it('sends back correct type', async () => {
            const body = {title: 'Tetris', genre: 'arcade', yearReleased: 1984}
            const response = await request(server).post('/games').send(body);

            expect(typeof response.body).toBe('object');
        })

        it('all needed properties added', async () => {
            const body = {title: 'Tetris', yearReleased: 1984}
            const response = await request(server).post('/games').send(body);
            const missing = ['title', 'genre'].filter(item => {return response.hasOwnProperty(item) === false})

            expect(missing.length).toBeGreaterThan(0);
            expect(response.status).toBe(422);

        })
    })

    
})