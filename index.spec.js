const request = require('supertest');
const server = require('./api/server');

describe('server', () => {
    it('can run tests', () => {
        expect(true).toBeTruthy();
    });
    it('can run multiple tests', () => {
        expect(false).toBeFalsy();
    });

    describe('GET /games route', () => {
        it('should return status code 200', async () => {
            const response = await request(server).get('/games');

            expect(response.status).toBe(200);
        });
        it('should return array', async () => {
            const response = await request(server).get('/games');

            expect(response.type).toBe('array');
        });
        it('should return empty array if no games', async () => {
            const response = await request(server).get('/games');

            expect(response.body).toEqual([]);
        });
    });
});