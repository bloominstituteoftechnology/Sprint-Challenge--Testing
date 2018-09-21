const server = require('../server');
const request = require('supertest');

describe('GET /', () => {
    it('should return "running"', async () => {
        const response = await request(server).get('/');
        expect(response.status).toBe(200);
    });
});
describe('POST /games', () => {
    it('status code should be 201', async () => {
        const response = await request(server).post('/games');
        expect(response.status).toBe(201);
    });
    it('status code should be 422 if information is insufficient', async () => {
        const response = await request(server).post('/games').send({
            genre: "MOBA"
        });
        expect(response.status).toBe(422);
    });
    it('should respond with json', async () => {
        const response = await request(server.post('/games'));
        expect(response.type).toBe('application/json');
    });
    it('should add a new game to the list of games', async () => {
        const response = await request(server)
        .post('/games')
        .send({ name: "Horizon Zero Dawn", genre: "RPG" });
        const expectedBody =  [
            { name: 'MHW' , genre: 'JRPG' },
            { name: 'AC Odyssey', genre: 'RPG' },
            { name: 'Marvel\'s Spiderman' , genre: 'RPG' },
            { name: "Horizon Zero Dawn", genre: "RPG" }
    ]
        expect(response.body).toBe(expectedBody);
    });
});
describe('GET /games', () => {
    it('status code should be 200', async () => {
        const response = await request(server).get('/games');
        expect(response.status).toBe(200);
    });
    it('should return a list of games', async () => {
        const response = await request(server).get('/games');
        const expectedBody =  [
            { name: 'MHW' , genre: 'JRPG' },
            { name: 'AC Odyssey', genre: 'RPG' },
            { name: 'Marvel\'s Spiderman' , genre: 'RPG' }
    ]
        expect(response.body).toEqual(expectedBody);
    });
    it('should check if type of response is array', async () => {
        const response = await request(server).get('/games');
        expect(typeof response.body).toBe('array');
    })
    it('should return an empty array if there are no games stored', async () => {
        const response = await request(server).get('/games');
        if ( !response.body ) {
            expect(response.body).toBe([]);
        }
    });
});
