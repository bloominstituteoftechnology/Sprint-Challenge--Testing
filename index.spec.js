const request = require('supertest');

const server = require('./server');

describe('server.js', () => {
    it('server should be running with status 200', async () => {

    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    })

    describe('/games POST', () => {
        const game = {
            title: 'Pacman',
            genre: 'Arcade',
            releaseYear: 1980
        };
        
        const NullGame = {
            title: 'Nullgame',
            genre: null
        };
    
        it('should return a stauts code of 201', async () => {
            const response = await request(server)
                .post('/games')
                .send(game);
            expect(response.status).toBe(201);
        })
    
        it('should return a JSON', async () => {
            const body = {title: 'Pacman', genre: 'Arcade', releaseYear: 1980};
            const response = await request(server)
                .post('/games')
                .send(body);
            expect(response.type).toBe('application/json');
        })
        
        it('should return status 422 if either game title or genre not enter', async () => {
            const response = await request(server)
                .post('/games')
                .send(NullGame);
            expect(response.status).toBe(422);
        })
    })
    
    describe('/games GET route', () => {
        it('should return a status code of 200', async () => {
            const response = await request(server).get('/games')
            expect(response.status).toBe(200);
        })
    
        it('should return an JSON', async () => {
            const response = await request(server).get('/games');
            expect(response.type).toBe('application/json');
        })
    
        it('should return an array', async () => {
            const response = await request(server)
                .get('/games')
            expect(Array.isArray(response.body)).toBe(true)
        })
    })
})



