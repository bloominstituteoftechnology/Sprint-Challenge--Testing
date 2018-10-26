const request = require('supertest');
const server = require('./api/server.js');

describe('Server', () => {
    describe('GET /', () => {
        it('returns status code 200(OK)', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });

        it('returns JSON', async () => {
            const res = await request(server).get('/');
            expect(res.type).toBe('application/json');
        });

        it('returns {message: "Server is up!"', async () => {
            const res = await request(server).get('/');
            expect(res.body).toEqual({message: 'Server is up!'});
        });
    });

    describe('GET /games', () => {
        it('returns an empty array if no games', async () => {
            const res = await request(server).get('/games');
            expect(res.body.data).toEqual([]);
        });

        it('returns status code 200(OK)', async () => {
            const res = await request(server).get('/games');
            expect(res.status).toBe(200);
        });
        
        it('returns JSON', async () => {
            const res = await request(server).get('/games');
            expect(res.type).toBe('application/json');
        });
        
        it('returns an array of objects of games', async () => {
            const expected = [
                {
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                },
                {
                    title: 'Rocket Knight Adventures',
                    genre: 'Platformer',
                    releaseYear: 1993
                },
                {
                    title: 'Metal Slug',
                    genre: 'Platformer',
                    releaseYear: 1996
                },
                {
                    title: 'Sonic R',
                    genre: 'Racing',
                    releaseYear: 1997
                }
                
            ]
            const res = await request(server).get('/games');
            expect(res.body.data).toEqual(expected);
        });

    });

    describe('POST /games', () => {
        it('returns status code 201(CREATED)', async () => {
            const game = {
                title: 'Ikasuze! Ai No Doki Doki Penguin Land MD',
                genre: 'Puzzle',
                releaseYear: 1992
            }

            const res = await request(server).post('/games').send({game});
            expect(res.status).toBe(201);
        });
        
        it('returns JSON', async () => {
            const game = {
                title: 'Puyo Puyo',
                genre: 'Puzzle',
                releaseYear: 1991
            }

            const res = await request(server).post('/games').send({game});
            expect(res.type).toBe('application/json');
        });

        it('returns an array of objects of games', async () => {
            const expected = [
                {
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                },
                {
                    title: 'Rocket Knight Adventures',
                    genre: 'Platformer',
                    releaseYear: 1993
                },
                {
                    title: 'Metal Slug',
                    genre: 'Platformer',
                    releaseYear: 1996
                },
                {
                    title: 'Sonic R',
                    genre: 'Racing',
                    releaseYear: 1997
                },
                {
                    title: 'Ikasuze! Ai No Doki Doki Penguin Land MD',
                    genre: 'Puzzle',
                    releaseYear: 1992
                },
                {
                    title: 'Puyo Puyo',
                    genre: 'Puzzle',
                    releaseYear: 1991
                },
                {
                    title: 'Kirby’s Dream Land',
                    genre: 'Platformer',
                    releaseYear: 1992
                }
            ]

            const game = {
                title: 'Kirby’s Dream Land',
                genre: 'Platformer',
                releaseYear: 1992
            }
            
            const res = await request(server).post('/games').send({game});
            expect(res.body.data).toEqual(expected);
        });

        it('returns status 422 if required fields are not met', async () => {
            const game = {
                title: 'Puyo Puyo',
                releaseYear: 1991
            }

            const res = await request(server).post('/games').send({game});
            expect(res.status).toBe(422);
        });
    });
});