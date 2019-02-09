const request = require('supertest');

const server = require('./server');

const db = require('../data/dbConfig');

describe('the route handlers', () => {
    describe('get /games', () => {
        //check status code 200
        it('responds with 200', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toBe(200);
        });

        it('returns an array', async () => {
            const response = await request(server).get('/games');
            expect(response.body).toEqual([{"genre": "Arcade", "id": 1, "releaseYear":1980, "title": "Pacman"}, {"genre": "Action", "id": 2, "releaseYear": 1985, "title": "Contra"}, {"genre": "Arcade", "id": 3, "releaseYear": 1983, "title": "Donkey Kong"}]);
        });
    });

    describe('post /games', () => {

        // afterEach(async () => {
        //     await db('games').truncate();
        // });

        it('responds with 201 when body is correct', async () => {
            const body = { title: "Pacman", genre: "Arcade"};

            const response = await request(server)
                .post('/games')
                .send(body);
            
            expect(response.status).toBe(201)

        })

        

    })
})