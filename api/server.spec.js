const server = require('./server');
const request = require('supertest');

describe('server routes', () => {
    describe('should check the server is up and running', () => {
        it('entry test route', async () => {
            const response = await request(server).get('/');
            expect(response.status).toBe(200)
        });
        
        it('should return body with {message: "running...', async () => {
            const response = await request(server).get('/');
            expect(response.body).toEqual({ message: 'running...'});
        });
    });
    
    describe('get games route', () => {
        it('should check that the get games route is active', async () => {
            const response = await request(server).get('/api/games');
            expect(response.status).toBe(200)
        });

        it('should check for a list of games', async () => {
            const response = await request(server).get('/api/games');
            expect(response.body).toEqual([]);
        });

        it('should have a response type of', async () => {
            const response = await request(server).get('/api/games');
            expect(response.type).toBe('application/json');
        });
    });

    describe('post game route', () => {
        it('should check post route is active', async () => {
            const response = await request(server)
                .post('/api/addgame')
                .send({ title: "Pacman", genre: "Arcade", releaseYear: 1980 });
            expect(response.status).toBe(200);
        });

        it('should check servers response body', async () => {
            const response = await request(server)
                .post('/api/addgame')
                .send({ title: "Pacman", genre: "Arcade", releaseYear: 1980 });
            expect(response.body).toEqual({ message: 'Pacman has been added!' })
        });
        
        it('should check response type', async () => {
            const response = await request(server)
                .post('/api/addgame')
                .send({ title: "Pacman", genre: "Arcade", releaseYear: 1980 });
            expect(response.type).toBe('application/json')
        });

        it('should fail if body is incomplete', async () => {
            const response = await request(server)
                .post('/api/addgame')
                .send({ title: "Pacman", releaseYear: 1980 });
            expect(response.status).toBe(422);
        })
    });

});