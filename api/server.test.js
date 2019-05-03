const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig')

describe('the route handler', () => {
    describe('get /games', () => {
        it('respond with 200 when get is successful', async () => {
            const response = await request(server)
                .get('/games');
            expect(response.status).toBe(200);
        })
        it('respond with json', async () => {
            const response = await request(server)
            .get('/games');
            expect(response.type).toMatch(/json/i);
        })
      
        it('respond with 400 when db is empty', async () => {
            const response = await request(server)
                .get('/games');
            
                expect(response.status).toBe(200);
        })
    })
})



describe('create new games entry', () => {
    describe('post /games', () => {
       /*  afterEach(async () => {
            await db('games').truncate();
        }) */
        it('respond with 201 when post is successful', async () => {
            const body = { title: 'test', genre: 'testGenre' };
            const response = await request(server)
                .post('/games').send(body);
            expect(response.status).toBe(201);

        })
        it('respond with 422 when the genre is missing', async () => {
            const body = { title: 'test' };
            const response = await request(server)
                .post('/games').send(body);
            expect(response.status).toBe(422);

        })
        it('respond with 422 when the title is missing', async () => {
            const body = { genre: 'testGenre' };
            const response = await request(server)
                .post('/games').send(body);
            expect(response.status).toBe(422);

        })
        it('respond with 422 when post is incomplete', async () => {
            const body = {};
            const response = await request(server)
                .post('/games').send(body);
            expect(response.status).toBe(422);

        })
    })
})

describe('get the games by id', () => {
    describe('get /game with id', () => {
        it('respond with 200 when get is successful', async () => {
            const id = '1';
            const response = await request(server)
                .get('/games/1').send(id);
            expect(response.status).toBe(200);
        })
    })
 
})


describe('the Delete handler', () => {
    describe('delete /games', () => {
        it('respond with 200 when delete is successful', async () => {
            const id = '10';
            const response = await request(server)
                .delete('/games/10').send(id);
            expect(response.status).toBe(200);
        })

        it('respond with 404 when delete fails', async () => {
            const id = '7';
            const response = await request(server)
                .delete('/games/7').send(id);
            expect(response.status).toBe(404);
        })
    })
})
