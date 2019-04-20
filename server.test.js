const request = require('supertest');
const server = require('./server');
const db = require('./dbConfig');



afterEach(async() => {
    await db('games').truncate();
})

describe('Route handlers', () =>{
    
    describe('Post endpoint for games', () =>{
        it('Should respond with a 422 status code if information is missing', async() =>{
            const response = await request(server).post('/games')
            .send({title: 'Super Smash Bros'});
            expect(response.status).toBe(422);
        });
        it('Should respond witha 201 status code if object is successfully added', async() =>{
            const response = await request(server).post('/games')
            .send({title: 'Spyro', genre: 'RPG'});
            expect(response.status).toBe(201);
        });
        it('Should respond with a JSON object', async() =>{
            const response = await request(server).post('/games')
            .send({title: 'Call of Duty', genre: 'FPS'});
            expect(response.type).toBe('application/json');
        });
    });

    describe('Get endpoints for games', () =>{
        it('Should return a 200 status code', async() =>{
            const response = await request(server).get('/games');
            expect(response.status).toBe(200);

        });
        it('Should return in JSON format', async()=>{
            const response = await request(server).get('/games');
            expect(response.type).toBe('application/json');
        });
        it('Should return in an array format', async() =>{
            const response = await request(server).get('/games');
            expect(Array.isArray(response.body)).toBeTruthy();
        });

    });
 
});