const server = require('./server');
const request = require('supertest');

describe('server.js', () => {
    it('Server should be running with status code 200 OK', async() => {
        const expected = 200;
        const response = await request(server).get('/');

        expect(response.status).toEqual(expected);
    });

    describe('POST /games error', () => {
        it('should return status 422 for not provided title and genre fields', async () => {
            const game1 = { title: 'MU Origin' };
            const expected = 422;
            const response1 = await request(server).post('/games').send(game1);
                expect(response1.status).toEqual(expected);
            
            const game2 = { genre: 'RPG' };
            const response2 = await request(server).post('/games').send(game2);
                expect(response2.status).toEqual(expected);
        });

        it('should return JSON', async () => {
            const game = { title: 'MU Origin' };
            const expected = 'application/json';
            const response = await request(server).post('/games').send(game);
            
            expect(response.type).toEqual(expected)
        });

        it('should return an error', async () => {
            const game = { title: 'MU Origin' };
            const expected = { message: 'Required fields: Title & Genre!!!!!!!!' };
            const response = await request(server).post('/games').send(game);
      
            expect(response.body).toEqual(expected);
        });

        it('should return 405 for not unique title', async () => {
            const gameUnique = {
                title: 'Counter Strike',
                genre: 'FPS',
                releaseYear: 1999 
            }
      
            const expectedError = 405;
            const response1 = await request(server).post('/games').send(gameUnique);
            const response2 = await request(server).post('/games').send(gameUnique);

            expect(response1.status).toEqual(201);
            expect(response2.status).toEqual(expectedError);
          });
    });

    describe('POST /games posted successfully', () => {
        it('should return status 201', async() => {
            let game = {
                title: 'Pacman',
                genre: 'Arcade',
                releaseYear: 1980 
            };
            const expected = 201;
            const response = await request(server).post('/games').send(game);
            expect(response.status).toEqual(expected);
        });

        it('should return JSON', async() => {
            let game = {
                title: 'Diablo 3',
                genre: 'RPG',
                releaseYear: 2013 
            };

            const expected = 'application/json';
            const response = await request(server).post('/games').send(game);

            expect(response.type).toEqual(expected);
        });

        it('should have an id field', async() => {
            let game = {
                title: 'Diablo 1',
                genre: 'RPG',
                releaseYear: 1997 
            };

            const response = await request(server).post('/games').send(game);

            expect(response.body.id).toBeDefined();
            expect(typeof response.body.id).toBe('number');
        });
    });

    describe('GET /games', () => {
        it('should return status code 200', async () => {
            const expected = 200;
            const response = await request(server).get('/games');
            
            expect(response.status).toEqual(expected);
        });
    
        it('should return an array', async () => {
            const response = await request(server).get('/games');

            expect(Array.isArray(response.body)).toBeTruthy();
        });
    });

});