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
        it('should return status code 200', async () => {
            const response = await request(server).get('/games');

            expect(response.status).toBe(200);
        });
        it('should return array', async () => {
            const response = await request(server).get('/games');

            expect(response.type).toBe('array');
        });
        it('should return empty array if no games', async () => {
            const response = await request(server).get('/games');

            expect(response.body).toEqual([]);
        });
    });

    describe('POST /games/add route', () =>{
        it('should take in a json', async () => {
            const title = 'Video Game Man';
            const genre = 'action-adventure';
            const releaseYear = '1986';
            const expected = { 
                title: title,
                genre: genre,
                releaseYear: releaseYear
             };

            const response = await request(server).post(`/games/add`).send( { lastName } );

            expect(response.body).toEqual(expected);
        });
        it('should return 422 status code if missing title or genre', async () => {
            const title = 'Video Game Man';
            const genre = '';
            const releaseYear = '1986';
            const expected = { 
                title: title,
                genre: genre,
                releaseYear: releaseYear
             };

            const response = await request(server).post(`/games/add`);

            expect(response.status).toBe(422);
        });
        it('should return 200 status code if all info is entered', async () => {
            const title = 'Video Game Man';
            const genre = 'action-adventure';
            const releaseYear = '1986';
            const expected = { 
                title: title,
                genre: genre,
                releaseYear: releaseYear
             };

            const response = await request(server).post(`/games/add`);

            expect(response.status).toBe(200);
            done();
        });
    });
});