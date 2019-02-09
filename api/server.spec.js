const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig.js');

describe('route handlers', () => {
    beforeEach( () => {
        return db.migrate.rollback()
        .then( () => {
            return db.migrate.latest()
            .then( () => {
                return db.seed.run()
            })
        })
    })
    
    afterEach(async () => {
        await db.migrate.rollback()
    })
    
    // 3 Tests per endpoint
    describe('get /', () => {
        // The GET /games endpoint should return the list of games and HTTP status code 200.
        it('http Status code 200', async () => {
            const success = await request(server).get('/');
            expect(success.status).toBe(200);
        });

        it('should send back a proper response', async () => {
            const success = await request(server).get('/');
            expect(success.body.length).toBe(3);
        });
        
        // Write a test to make sure this endpoint always returns an array, even if there are no games stored. If there are no 
        // games to return, the endpoint should return an empty array.
        it('sends empty array when empty', async () => {
            const empty = await request(server).get('/');
            expect(empty.body).toEqual([]);
        });
    });

    describe('get by ID', () => {
        it('Success responds with 200', async () => {
            const success = await request(server).get('/2');
            expect(succes.status).toBe(200);
        });
        
        // Write a GET /games/:id endpoint that returns the information about a single game. 
        it('sends correct response to request', async () => {
            const success = await request(server).get('/1');
            expect(success.body.id).toEqual(1);
            expect(success.body.title).toEqual('Monoply');
            expect(success.body.genre).toEqual('Board');
            expect(success.body.releaseYear).toEqual(1980);
        });

        // Respond with a 404 status code when a game is not found for the provided id. Add the corresponding tests for it.
        it('responds with 404 if game not found by id', async () => {
            const failed = await request(server).get('/8');
            expect(failed.status).toBe(404);
        });
    });

    describe('POST', () => {
        it('responds with 201 when it works', async () => {
            const game1 = {
                title: 'Game 1',
                genre: 'Best Game Ever',
                releaseYear: 2050
            };

            const succes = await request(server).post('/').send(game1);
            expect(success.status).toBe(201);
        });
        
        //  In the route handler, validate that the required fields are included inside the body. If the information is incomplete, return a 422 status code.
        it('sends proper response', async () => {
            const game1 = {
                title: 'Game 1',
                genre: 'Best Game Ever',
                releaseYear: 2050
            };

            const success = await request(server).post('/').send(game1);
            expect(success.body.title).toEqual('Game 1');
            expect(success.body.genre).toEqual('Best Game Ever');
            expect(success.body.releaseYear).toEqual(2050);
        });

        it('responds with 422 when missing genre', async() => {
            const game2 = {
                title: 'Game 2'
            };

            const failed = await request(server).post('/').send(game2);
            expect(failed.status).toBe(422);
        });

        it('responds with 422 when missing title', async() => {
            const game2 = {
                genre: 'Penny Slots'
            };

            const failed = await request(server).post('/').send(game2);
            expect(failed.status).toBe(422);
        });

        it('responds 405 when non-unique title', async() => {
            const game3 = {
                title: 'Monoply', 
                genre: 'Board', 
                releaseYear: 1980
            };

            const failed = await request(server).post('/').send(game3);
            expect(failed.status).toBe(405);
        });
    });

    describe('Delete by ID', () => {
        it('responds with 200 when successful', async () => {
            const success = await request(server).delete('/3');
            expect(response.status).toBe(200);
        });

        it('sends proper response', async () => {
            const success = await request(server).delete('/3')

            expect(success.body.id).toEqual(3);
            expect(success.body.title).toEqual('Risk');
            expect(success.body.genre).toEqual('Board');
        });

        it('responds with 404 on failure', async() => {
            const failed = await request(server).delete('8');
            expect(failed.status).toBe(404);
        });
    });

});
