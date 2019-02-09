const request = require('supertest');
const sever = require('./server');

const games = require('./gameModel');

describe('Route handlers', () =>{
    describe('Get endpoints for games', () =>{
        it('Should return a 200 status code', async() =>{
            const response = await request(server).get('/games');
            expect(response.status).toBe(200);

        });
        it('Should return in JSON format', async()=>{
            const response = await request(server).get('/games');
            expect(response.type).toMatch(/json/i);
        });
        it('Should return in an array format', async() =>{
            const response = await request(server).get('/games');
            expect(Array.isArray(response.body)).toBeTruthy();
        });

    });
});