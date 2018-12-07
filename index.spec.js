const request = require('supertest');
const server = require('./api/server.js');

describe('server.js', () => {
    describe('/ route', () => {
        it('should return status code 200', async () => {
            let response = await request(server).get('/');
            expect(response.status).toBe(200);
        });
        it('should return JSON', async () => {
            let response = await request(server).get('/');
            expect(response.type).toBe('application/json');
        });
        it('should return with a body like: { api: "working" }', async () => {
            let response = await request(server).get('/');
            expect(response.body).toEqual({ api: 'working' });
        });
    });
    describe('POST /create route', () => {
        it('should return status code 200', async () => {
            let response = await request(server)
            .post('/create')
            .send({ task: 'cook', role: 'chef' });

            expect(response.body).toEqual({ work: 'cook, chef' });
            
        });
        it('should return JSON', async () => {
            let response = await request(server).post('/create');
            expect(response.type).toEqual('application/json');
    });
    });
    describe('DELETE/delete/:id route', () => {
        it('delete sends status code for success 202(Accepted)', async () => {
            let response = await request(server)
            .delete('delete/1')
            expect(response.status).toBe(202);
        });
        it('should return deleted status message', async () => {
            let response = await request(server)
            .delete('delete/1')
            expect(response.text).toEqual('Deleted');
        });
});
});