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
    });

    describe('POST /games posted successfully', () => {
        let response;

        beforeEach(async () => {
            let game = {
                title: 'Pacman',
                genre: 'Arcade',
                releaseYear: 1980 
            };

            response = await request(server).post('/games').send(game);
        });

        it('should return status 201', () => {
            const expected = 201;

            expect(response.status).toEqual(expected);
        });

        it('should return JSON', () => {
            const expected = 'application/json';

            expect(response.type).toEqual(expected);
        });

        it('should have an id field', () => {
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