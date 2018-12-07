const request = require('supertest');
const server = require('./index');

const validGame = {
    title: 'Pacman', // required
    genre: 'Arcade', // required
    releaseYear: 1980 // not required
}
const invalidGame = {
    title: 'Tetris',
    // genre missing
    releaseYear: 1
}

describe('root path', () => {
    it('should return {api: up}', async () => {
        const response = await request(server).get('/');
        expect(response.body).toEqual({api: 'up'});
    });
});

describe('GET when no games are stored', () => {
    it('should return a empty array', async () => {
        const response = await request(server).get('/games')
        expect(response.body).toEqual([]);
    })
});

describe('POST', () => {
    it('should return JSON data type', async () => {
        const response = await request(server)
        .post('/games')
        .send(validGame);
        expect(response.type).toBe('application/json');
    });
    it('should return status 422 if information is incomplete', async () => {
        const response = await request(server)
        .post('/games')
        .send(invalidGame);
        expect(response.status).toBe(422);
    });
    it('should return status 201 on success', async () => {
        const response = await request(server)
        .post('/games')
        .send(validGame);
        expect(response.status).toBe(201);
    });
});

describe('GET', () => {
    it('should return JSON data type', async () => {
        const response = await request(server).get('/games');
        expect(response.type).toBe('application/json');
    });
    it('should return status 200', async () => {
        const response = await request(server).get('/games');
        expect(response.status).toBe(200);
    });
    it('should return an array', async () => {
        const response = await request(server).get('/games');
        expect(Array.isArray(response.body)).toBe(true);
    });
});

