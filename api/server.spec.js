const server = require('./server');
const request = require('supertest');

describe('server routes', () => {
    describe('should check the server is up and running', () => {
        it('entry test route', async () => {
            const response = await request(server).get('/');
            expect(response.status).toBe(200)
        });
        
        it('should return body with {message: "running...', async () => {
            const response = await request(server).get('/');
            expect(response.body).toEqual({ message: 'running...'});
        });
    });
    
    describe('get games route', () => {
        it('should check that the get games route is active', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toBe(441)
        })
        it('should check for a list of games', async () => {
            const response = await request(server).get('/games');
            expect(response.body).toEqual('list');
        });
        it('should have a response type of', async () => {
            const response = await request(server).get('/games');
            expect(response.type).toBe('there');
        });
    });

});