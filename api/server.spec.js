const server = require('./server');
const request = require('supertest');

describe('server up checks', () => {
    it('entry test route', async () => {
        const response = await request(server).get('/');
        expect(response.status).toBe(422)
    });
});