const request = require('supertest');
const server = require('./games/server.js');

describe('POST /games', () =>{
    it('should return a status of 200(ok)', async () => {
        const games = {
            title: 'pacman',
            genre:'arcade'
    };
        const response = await request(server).post('/games').send(games);
        expect(response.status).toBe(200);
    });

    it('should return a status of 422(ok)', async () => {
        const games = {
            genre:'arcade'
        };
        const response = await request(server).post('/games').send(games);
        expect(response.status).toBe(422);
    });

})

describe('server', ()=>{
    describe('GET / games', () =>{
    it('should return status code of 200(ok)', async () =>{
        const response = await request(server).get('/games');
        expect(response.status).toBe(200);
    });
    it('should return JSON', async () => {
        const response = await request(server).get('/games');
        expect(response.type).toBe('application/json');
    });
    it('should return an array and if nothing to return make it empty', async() => {
        const response = await request(server).get('/games');
        expect(response.body).toEqual(expect.arrayContaining([]));
    });
    });
});