const server = require('./api/server.js');

const request = require('supertest');

describe('testing for GET and POST server endpoints', () => {
    describe('GET /games endpoint tests', () => {
        it('should return status code 200(OK)', async () => {
        const response = await request(server).get('/games')
            expect(response.status).toBe(200);
            });
        
        it('should return JSON', async () => {
            const response = await request(server).get('/games');
    
            expect(response.type).toBe('application/json');
        })
        it('should return the correct array of game objects', async () => {
            const response = await request(server).get('/games');
            const expected = [
                {
                    title: 'Halo:CE',
                    genre: 'FPS',
                    releaseYear: 2001
                },
                {
                    title: 'Halo 2',
                    genre: 'FPS',
                    releaseYear: 2004
                },
                {
                    title: 'Halo 3',
                    genre: 'FPS',
                    releaseYear: 2007
                }
            ];
            expect(response.body).toEqual(expected);
            expect(Array.isArray(response.body)).toBe(true);
        })
    })
    describe('POST tests for /games', () => {
        it('should return a 422 status code if the object being sent is incomplete', async () => {
            const newGame = {
                title: "Halo 4",
                releaseYear: 2012
            }
            const response = await request(server).post('/games').send(newGame);
            expect(response.status).toBe(422);
        })
        it('should return status 201 if the object has required fields', async () => {
            
            const newGame = {
                title: 'Halo 4', // required
                genre: 'FPS', // required
                releaseYear: 2012 // not required
            }
            const response = await request(server).post('/games').send(newGame);
            expect(response.status).toBe(201);
        })
        it('should return JSON', async () => {
            const newGame = {
                title: 'Halo 4', // required
                genre: 'FPS', // required
                releaseYear: 2012 // not required
            }
            const response = await request(server).post('/games').send(newGame);
    
            expect(response.type).toBe('application/json');
        })
        it('should return a message with the game title indicating the post was successful', async () => {
            const newGame = {
                title: 'Halo 4', // required
                genre: 'FPS', // required
                releaseYear: 2012 // not required
            }
            const response = await request(server).post('/games').send(newGame);
            expect(response.body).toEqual({message: `Halo 4 added to games database.`})
        })
        it('should return error 419 if a duplicate game is added', async () => {
            const duplicateGame = {
                    title: 'Halo:CE',
                    genre: 'FPS',
                    releaseYear: 2001
            };
            const response = await request(server).post('/games').send(duplicateGame);
            expect(response.status).toBe(419);
        })
    })
}) 