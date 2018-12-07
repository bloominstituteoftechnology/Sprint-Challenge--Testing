const request = require('supertest');

const server = require('../api/server.js');

const db = require('../data/dbConfig.js');

beforeEach(async () => {
    await db('games').truncate();
    await db.seed.run();
});

describe('gamesRouter.js', () => {
    describe('/games endpoint', () => {
        it('[GET] - should return an array', async () => {
            let response = await request(server).get('/games');
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('[GET] - should return status 200', async () => {
            let response = await request(server).get('/games');
            expect(response.status).toBe(200);
        });

        it('[GET] - should return all games in table', async () => {
            // check get with seed element in table
            let response = await request(server).get('/games');
            expect(response.body).toEqual([seedElement]);

            // add valid game to table
            await request(server).post('/games').send(validPost);

            // check get with 2 elements in table
            response = await request(server).get('/games');
            expect(response.body).toEqual([seedElement, Object.assign(validPost, {id: 2})]);

            // add valid game to table, no year
            await request(server).post('/games').send(validPostNoYear);

            // check get with 3 elements in table
            response = await request(server).get('/games');
            expect(response.body).toEqual([seedElement, Object.assign(validPost, {id: 2}), Object.assign(validPostNoYear, {id: 3, releaseYear: null})]);
        });

        it('[POST] - should return status 201 if valid post', async () => {
            let response = await request(server).post('/games').send(validPost);
            expect(response.status).toBe(201);

            response = await request(server).post('/games').send(validPostNoYear);
            expect(response.status).toBe(201);
        });

        it('[POST] - should return 422 if invalid post', async () => {
            let response = await request(server).post('/games').send(invalidPostNoTitle);
            expect(response.status).toBe(422);

            response = await request(server).post('/games').send(invalidPostNoTitleNoYear);
            expect(response.status).toBe(422);

            response = await request(server).post('/games').send(invalidPostNoGenreNoYear);
            expect(response.status).toBe(422);

            response = await request(server).post('/games').send(invalidPostNoGenre);
            expect(response.status).toBe(422);

            response = await request(server).post('/games').send(invalidPostNoGenreNoTitle);
            expect(response.status).toBe(422);
        });

        it('[POST] - should return 405 if game is already in table', async () => {
            let response = await request(server).post('/games').send(validPost);
            expect(response.status).toBe(201);

            response = await request(server).post('/games').send(validPost);
            expect(response.status).toBe(405);
        });
    });

    describe('/games/:id endpoint', () => {
        it('[GET] - should return 200 for valid id', async () => {
            let response = await request(server).get('/games/1');
            expect(response.status).toBe(200);
        });

        it('[GET] - should return the corresponding row if the id is valid', async () => {
            let response = await request(server).get('/games/1');
            expect(response.body).toEqual([seedElement]);
        });

        it('[GET] - should return 404 if id does not exist', async () => {
            let response = await request(server).get('/games/33');
            expect(response.status).toBe(404);
        });

        it('[PUT] - should return 200 for successful game update', async () => {
            let response = await request(server).put('/games/1').send(validPost);
            expect(response.status).toBe(200);
        });

        it('[DELETE] - should return 200 for successful delete', async () => {
            let response = await request(server).delete('/games/1');
            expect(response.status).toBe(200);
        });

        it('[DELETE] - should return 404 if id does not exist', async () => {
            let response = await request(server).delete('/games/33');
            expect(response.status).toBe(404);
        });

        it('[DELETE] - should return 1 for successful delete', async () => {
            let response = await request(server).delete('/games/1');
            expect(response.body).toEqual(1);
        });
    });
});

const seedElement = {
    id: 1,
    title: 'Pacman',
    genre: 'Arcade',
    releaseYear: 1980
};

const validPost = {
    title: 'Star Fox 64',
    genre: 'Scrolling shooter',
    releaseYear: 1997
};

const validPostNoYear = {
    title: 'Flicky',
    genre: 'Platform'
};

const invalidPostNoTitle = {
    genre: 'Puzzle',
    releaseYear: 2001
};

const invalidPostNoTitleNoYear = {
    genre: 'Educational'
};

const invalidPostNoGenre = {
    title: 'Shining Force',
    releaseYear: '1993'
};

const invalidPostNoGenreNoYear = {
    title: 'Dark Souls'
};

const invalidPostNoGenreNoTitle = {
    releaseYear: 1999
};