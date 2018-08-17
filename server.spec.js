const request = require('supertest');

const server  = require('./server');

describe('server.js endpoints', () => {
    describe('GET /', () => {
        test('should return status code 200, JSON', async () => { 
    
        await request(server)
            .get('/games')
            .expect(200, []);
        })
    })
})