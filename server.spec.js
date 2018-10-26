const request = require('supertest');

const server = require('./api/server.js');

describe('server', () => {

    describe('POST /games', () => {

        it('should validate required field were included: title and genre', async () => {
            const expected = {title: 'Pacman', genre: 'Arcade'}

            const response = await request(server)
                .post('/games')
                .send({
                    title: 'Pacman', 
                    genre: 'Arcade', 
                });

            expect(response.body).toEqual(expected);        
        });

        it('should return 422 if required field(s) not included: title and genre', async () => {
            const response = await request(server).post('/games');

            expect(response.status).toBe(422);
        });

        it('should return 201 if game was added successfully', async () => {
            const response = await request(server).post('/games');

            expect(response.status).toBe(201);
        });

        it('should return 500 if game was NOT added successfully', async () => {
            const response = await request(server).post('/games');

            expect(response.status).toBe(500);
        });
    });

    
    describe('GET /games', () => {
        
        it('should return status code 200 for successfully retreiving list of games', async () => {
            const response = await request(server).get('/games');

            expect(response.status).toBe(200);
        });

        it('should return an empty array when no games', async () => {
            const response = await request(server).get('/games');

            expect(response.body).toMatchObject([]);
        });

        it('should always return an array', async () => {
            const expected = {title: 'Pacman', genre: 'Arcade', releaseYear: 1980}

            const response = await request(server).get('/games')

            expect(response.body).toMatchObject(expected);
   
        });
    });

});
