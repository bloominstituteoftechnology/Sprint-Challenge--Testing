const request = require('supertest');

const server  = require('./server');



describe('server.js endpoints', () => {
    describe('GET /games', () => {
        test('should return status code 200, JSON', async () => { 
    
        await request(server)
            .get('/games')
            .expect(200, []);
        })
    })


describe('POST /games' , () => {
    test('should return status code 201, JSON, and title body if releaseYear isnt sent', async () => {
        await request(server)
            .post('/games')
            .send({title:'Madden', genre: 'Sports'})
            .expect('Content-Type', /json/)
            .expect(201, {title: 'Madden', genre: 'Sports'})
    })

    test('should return status code 201, JSON, and title, body, releaseYear', async () => {
        await request(server)
            .post('/games')
            .send({title: 'Madden', genre:'Sports', releaseYear:2018});
    });

    test('should return status code 422 if title and body are not provided', async () => {
        await request(server)
            .post('/games')
            .expect(422);
    })
})


})