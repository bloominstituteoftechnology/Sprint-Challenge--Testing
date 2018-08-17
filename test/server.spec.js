const request = require('supertest');

const server = require('../server.js');

describe('server.js', () => {
    describe('GET /games', () => {

        it('should return HTTP status code 200', async () => {
            const expected = 200;

            const response = await request(server).get('/games');

            expect(response.status).toEqual(expected);
        });

        it('should return list of games', async () => {
            const expected = [{ title: 'Pacman', genre: 'Arcade', releaseYear: 1980}];

            const response = await request(server).get('/games');

             expect(response.body).toEqual(expected);
        });

        it('should always return an array, even if there are no games stored', async () => {
            const response = await request(server).get('/games');
        
            expect(response.body);
        });
    });

    describe('POST /games', () => {

        it('should validate the required field are included inside the body and add into the array', async () => {
            const expected = [{ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 }, {title: 'Galaga', genre: 'Arcade', releaseYear: 1981 }];

            const response = await request(server).post('/games').send({ title: 'Galaga', genre: 'Arcade', releaseYear: 1981 });

            expect(response.body).toEqual(expected);
        });

        it('should return 422 status code if information is incomplete', async () => {
            const expected = 422;

            const response = await request(server).post('/games').send({ title: 'centipede' });

            expect(response.status).toEqual(expected);
        });

        it('should return correct HTTP status code when receiving correct game data', async () => {
            const expected = 201;

            const response = await request(server).post('/games').send({ title: 'Centipede', genre: 'Arcade', releaseYear: 1981 });

            expect(response.status).toEqual(expected);
        });

        it('should return correct HTTP status code when receiving incorrect game data', async () => {
            const expected = 422;

            const response = await request(server).post('/games').send({ title: 'Donkey Kong', type: 'monkey', releaseYear: 1981 });

            expect(response.status).toEqual(expected);
        })
    });
});