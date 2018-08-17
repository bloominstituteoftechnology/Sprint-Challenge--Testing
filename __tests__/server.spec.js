const request = require('supertest');
const server = require('../index');

describe('SERVER', () => {
    describe('Index Route', () => {
        describe('get', () => {
            it('should return OK status code from get route', async () => {
                const res = await request(server).get('/');
                expect(res.status).toEqual(200);
            });
        });
    });
});
