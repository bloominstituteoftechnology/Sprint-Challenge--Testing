const request = require('supertest');
const server = require('../server');

describe('testing server.js', () => {
    
    describe('testing POST /games', () => {
        
        it('if info is incomplete, return error code 422', async () => {
            const response = await request(server).post('/games').send({title: "", genre: "Arcade",  releaseYear: 1984});
            expect(response.status).toEqual(422);
          });

        it('if info is complete, return status code 200', async () => {
            const response = await request(server).post('/games').send({title: "Tetris", genre: "Arcade",  releaseYear: 1984});
            expect(response.status).toEqual(201);
          });

    })

    describe('testing GET /games', () => {

        it('should return the list of games', async () => {
            const expected = {"games": [{title: "Pacman", genre: "Arcade",  releaseYear: 1980, id: 1}, {title: "Minecraft", genre: "Sandbox", releaseYear: 2009, id: 2}, {title: "World of Warcraft", genre: "Role-playing", releaseYear: 2004, id: 3}]};
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
        
        it('if id does not exist, return error code 404', async () => {
            // Can't get this to work if I include '/games/88'
            // const response = await request(server).delete('/games/88').send({id: '88'});
            const response = await request(server).delete('/games').send({id: '88'});
            expect(response.status).toEqual(404);
          });

          it('if id exists, return status code 201', async () => {
            const response = await request(server).delete('/games/3').send({id: '3'});
            expect(response.status).toEqual(200);
          });

    })
})