const request = require('supertest');
const server = require('./api/server');

describe('server', () => {
    it('can run tests', () => {
        expect(true).toBeTruthy();
    });
    it('can run multiple tests', () => {
        expect(false).toBeFalsy();
    });

    describe('GET /games route', () => {
        beforeAll( async () => {
            return response = await request(server).get('/games');
        });
        
        it('should return status code 200', async () => {
            expect(response.status).toBe(200);
        });
        it('should return array', async () => {
            expect(Array.isArray(response.body)).toBeTruthy;
        });
        it('should return empty array if no games', async () => {
            expect(response.body).toEqual(expect.arrayContaining([]));
        });
    });

    describe('POST /games/add route', () =>{
        const title = 'Video Game Man';
        const genre = 'action-adventure';
        const releaseYear = '1986';
        const expected = { 
            title: title,
            genre: genre,
            releaseYear: releaseYear
        };

        it('should return 200 status code if all info is entered', async () => {
            const response = await request(server).post(`/games/add`).send(expected);

            expect(response.status).toBe(200);
        });
        it('should return 422 status code if missing title', async () => {
            const title = '';
            const genre = 'action-adventure';
            const releaseYear = '1986';
            const expected = { 
                title: title,
                genre: genre,
                releaseYear: releaseYear
            };

            const response = await request(server).post(`/games/add`).send(expected);

            expect(response.status).toBe(422);
        });
        it('should return 422 status code if missing genre', async () => {
            const title = 'Video Game Man';
            const genre = '';
            const releaseYear = '1986';
            const expected = { 
                title: title,
                genre: genre,
                releaseYear: releaseYear
            };

            const response = await request(server).post(`/games/add`).send(expected);

            expect(response.status).toBe(422);
        });
        // it('should return 405 status code if attempting to create duplicate title', async () => {
        //     const response = await request(server).post(`/games/add`).send(expected);

        //     expect(response.status).toBe(405);
        // });
    });
});