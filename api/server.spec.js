const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

/* Clear the DB after each test */
afterEach(async () => {
    await db('games').truncate();
});

/* Check this endpoint for...
*  The correct status code.
*  That it is sending back a JSON object.
*/
describe('Checking the get endpoint for /games', () => {
    it('Sends back the correct status code.', async () => {
        const response = await request(server).get('/games');
        // Expect the response to be the 200 OK server status code.
        expect(response.status).toBe(200);
    });
    it('Sends back the correct data type.', async () => {
        const response = await request(server).get('/games');
        // This endpoint must send back a JSON object.
        expect(response.type).toMatch(/json/i);
    });
    it('Sends back a JSON object containing nothing.', async () => {
        const response = await request(server).get('/games');
        // Since there should be nothing in the database we expect it to return nothing.
        expect(response.body).toEqual([]);
    });
});

/* Check this endpoint for...
*  The correct status code.
*  That it is sending back a JSON object.
*  Sending a malformed object sends back a 422 server status code.
*/
describe('Checking the post endpoint for /games', () => {
    it('Posts correctly when the correct object is provided.', async () => {
        const body = {
            title: 'Final Fantasy 4',
            genre: 'JRPG',
            releaseYear: 1991
        }
        const response = await request(server).post('/games').send(body);
        // Expect the response status to be the 201 created server status code.
        expect(response.status).toBe(201);
    });
    it('Sends back a JSON object.', async () => {
        const body = {
            title: 'Final Fantasy 4',
            genre: 'JRPG',
            releaseYear: 1991
        }
        const response = await request(server).post('/games').send(body);
        expect(response.type).toMatch(/json/i);
    });
    it('Sends the added games ID.', async () => {
        const body = {
            title: 'Final Fantasy 4',
            genre: 'JRPG',
            releaseYear: 1991
        }
        const response = await request(server).post('/games').send(body);
        expect(response.body).toEqual({id: 1});
    });
    it('Sends the server code 422 with a malformed/missing body', async () => {
        const body = {
            title: 'Final Fantasy 4',
        }
        const response = await request(server).post('/games').send(body);
        expect(response.status).toBe(422);
    });
});