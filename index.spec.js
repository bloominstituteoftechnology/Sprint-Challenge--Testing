const request = require('supertest');

const server = require('./api/server.js');

describe('server', () => {
    describe('GET /', () => {
        
        it('return status code 200(OK)', async () => {
            const response = await request(server).get('/');

            expect(response.status).toBe(200);
        });
    
    })
    it('can run tests', () => {
        expect(true).toBeTruthy();
    });

    it('can run tests', () => {
        expect(false).toBeFalsy();
    });

    it('can even more run run run tests', () => {
        expect(false).toBeFalsy();
    });

    it('should return {message: "the line is hot"}', async () => {
        const response = await request(server).get('/');

        expect (response.body).toEqual('the line is hot');
    });

    describe('POST /api/game', () => {
        
        it('should return game', async () => {
            const name = 'Pacman';
            const expected = { name };

            const response = await request(server)
            .post(`${name}`)
            .send(`${name} is in` );

            expect(response.body).toEqual(expected);
        });
    });
    
});