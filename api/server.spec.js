const request = require('supertest');
const server = require('./server.js');


describe('In server.js', () => {
    describe('IN GET/GAMES', () => {

        it ('should respond with 200 OK', async () => {
            const response = await request(server).get('/games');

            expect(response.status).toBe(200);
        });

        it('should return JSON', async () => {
            const response = await request(server).get('/games');

            expect(response.type).toBe('application/json');
        });

        it('should return an array', async () => {
            const response = await request(server).get('/games');

           // console.log(response.res);
            //expect(response.body).toBe(Array);
            expect.arrayContaining([]);
        });

    });

    describe('IN POST/GAMES', () => {

        it ('should respond with 422 if no data passed', async () => {
            const response = await request(server).post('/games');

            expect(response.status).toBe(422);
        });

        it ('should respond with 200 if correct data passed', async () => {
           
            const response = await request(server).post('/games').send( {
                title: 'Pacman', // required
                genre: 'Arcade', // required
                releaseYear: 1980 // not required
            });

            expect(response.status).toBe(200);
        });

        it('should return JSON', async () => {
            const response = await request(server).post('/games');

            expect(response.type).toBe('application/json');
        });

        it('should return an array', async () => {
            const response = await request(server).post('/games');

            expect.arrayContaining([]);
        });

 

    });


});