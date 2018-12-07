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

    // describe('GET route', () => {
    //     it('should ')
    // });
});