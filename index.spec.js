const server = require('./api/server');
const request = require('supertest');

/// ----- CRUD ENDPOINT TESTS -----
// --- Test Test for Test GET Endpoint ---
describe('GET /testmebaby/149 Test Endpoint', () => {
    beforeAll( async () => {
        return response = await request(server).get('/testmebaby/149');
    });

    it('Should respond with JSON', () => {
        expect(response.type).toBe('application/json');
    });

    it('Should respond with a status code of 200 (OK)', () => {
        expect(response.status).toBe(200);
    });

    it('Should respond with One More Time', () => {
        expect(response.body).toBe('One More Time');
    });
})

// GET All Games Endpoint
describe('GET /games Endpoint', () => {
    beforeAll( async () => {
        return response = await request(server).get('/games');
    });

    it('Should respond with JSON', () => {
        expect(response.type).toBe('application/json');
    });

    it('Should respond with a status code of 200 (OK)', () => {
        expect(response.status).toBe(200);
    });

    it('Should respond with an array of objects', () => {
        const randomIndex = () => Math.floor(Math.random() * response.body.length);
        expect(Array.isArray(response.body)).toBeTruthy;

        // Test the type of three random units in the response array;
        expect(typeof response.body[randomIndex()]).toBe('object');
        expect(typeof response.body[randomIndex()]).toBe('object');
        expect(typeof response.body[randomIndex()]).toBe('object');
    });

    it('Should have objects in its array response with id, title, genre, and releaseYear properties', () => {
        const randomIndex = () => Math.floor(Math.random() * response.body.length);

        // Test the keys of three random units in the response array;
        expect(Object.keys(response.body[randomIndex()])).toEqual(['id','title','genre','releaseYear']);
        expect(Object.keys(response.body[randomIndex()])).toEqual(['id','title','genre','releaseYear']);
        expect(Object.keys(response.body[randomIndex()])).toEqual(['id','title','genre','releaseYear']);
    });
});
