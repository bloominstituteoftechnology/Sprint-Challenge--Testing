const server = require('./server.js');

const request = require('supertest');

describe('testing module', () => {

    describe('Tests GET/games functions', () => {
        // TESTING STATUS CODE
        test('should return status code 200', async () => {
            const res = await request(server).get('/games')

            expect(res.status).toBe(200);
        });
        // TESTING BODY DATA TYPE
        test('should return JSON', async () => {
            const res = await request(server).get('/games');

            expect(res.type).toBe('application/json');
        });
        // TESTING RETURN DATA
        test('should return the array', async () => {
            const res = await request(server).get('/games');

            const expected = [
                {
                    title: 'Super Smash Bros.',
                    genre: 'Action',
                    releaseYear: 1999
                },
                {
                    title: 'Super Smash Bros. Melee',
                    genre: 'Perfection',
                    releaseYear: 2001
                },
                {
                    title: 'Super Smash Bros. Brawl',
                    genre: 'Party',
                    releaseYear: 2006
                },
                {
                    title: 'Super Smash Bros. Ultimate',
                    genre: 'Fighting',
                    releaseYear: 2018
                }
            ];

            expect(res.body).toEqual(expected);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('Tests POST/games functions', () => {
        // TESTING STATUS CODE
        test('should return a 422 status code if information is incomplete', async () => {
            const incompleteGame = 
                {
                    title: "Plants vs Zombies 0",
                    releaseYear: 2009
                }
        
            const res = await request(server)
            .post('/games')
            .send(incompleteGame);
        
            expect(res.status).toBe(422);
        });
        // TESTING DATA TYPE
        test('should return JSON', async () => {
            const newGame = 
                {
                    title: 'Super Smash Bros. for WiiU',
                    genre: 'Action',
                    releaseYear: 2015
                }
        
            const res = await request(server).post('/games').send(newGame);
            expect(res.type).toBe('application/json');
        });
        // TESTING CORRECT RESPONSE
        test('should return status 201 if information is right', async () => {
            const body = 
                    {
                        title: 'Super Smash Bros. Ultimate',
                        genre: 'Fighting',
                        releaseYear: 2018
                    }
            const res = await request(server).post('/games').send(body);

            expect(res.status).toBe(201);
        });
    });
});