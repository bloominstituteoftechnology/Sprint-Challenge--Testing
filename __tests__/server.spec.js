const request = require('supertest');
const server = require('../server');

describe('testing server.js', () => {
    
    describe('testing POST /games', () => {
        
        it('if info is incomplete, return error code 422', async () => {
            const expected = 422;
            const response = await request(server).post('/games').send({title: "", genre: "Arcade",  releaseYear: 1984});
            expect(response.status).toEqual(expected);
          });

        it('if info is complete, return status code 200', async () => {
            const expected = 201;
            const response = await request(server).post('/games').send({title: "Tetris", genre: "Arcade",  releaseYear: 1984});
            expect(response.status).toEqual(expected);
          });

    })

    describe('testing GET /games', () => {

        it('should return the list of games', async () => {
            const expected = {"games": [{title: "Pacman", genre: "Arcade",  releaseYear: 1980}, {title: "Minecraft", genre: "Sandbox", releaseYear: 2009}, {title: "World of Warcraft", genre: "Role-playing", releaseYear: 2004}]};
            const response = await request(server).get('/games');
            expect(response.body).toEqual(expected);
          });

        it('should return HTTP status code 200', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toEqual(200);
          });

    })

    describe('testing GET  /games/:id', () => {
        
    })

    describe('testing DELETE  /games/:id', () => {
        
    })
})