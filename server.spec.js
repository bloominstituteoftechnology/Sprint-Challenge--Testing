const request = require('supertest');

const server = require('./api/server.js');

describe('server', () => {

    describe('POST /games', () => {

        it('should validate required fields were included: title and genre', async () => {
            const newGame = 
            {
                title: 'Fortnite',
                genre: 'Survival'
            }
            
            const response = await request(server)
                .post('/games')
                .send(newGame);

            expect(response.status).toBe(201);        
        });

        it('should return HTTP status code 422 if required field(s) not included: title and genre', async () => {
            const response = await request(server).post('/games');

            expect(response.status).toBe(422);
        });

        it('should return HTTP status code 201 if game was added successfully', async () => {
            const newGame = 
            {
                title: 'Fortnite',
                genre: 'Survival'
            }

            const response = await request(server)
            .post('/games')
            .send(newGame);

            expect(response.status).toBe(201);
        });
    }); // POST /games


    describe('GET /games', () => {
        
        it('should return HTTP status code 200 for successfully retreiving list of games', async () => {
            const response = await request(server).get('/games');

            expect(response.status).toBe(200);
        });

        it('should return an empty array when no games', async () => {
            const response = await request(server).get('/games');

            expect(response.body).toEqual(expect.arrayContaining([]));
        });

        it('should always return an array', async () => {
            const expected = [{title: 'Pacman', genre: 'Arcade', releaseYear: 1980}]

            const response = await request(server).get('/games')

            expect(response.body).toEqual(expect.arrayContaining(expected));
   
        });

        it('should return JSON', async () => {
            const response = await request(server).get('/games')
            
            expect(response.type).toBe('application/json');
        });
    }); // GET /games

}); // serve
