const request = require('supertest');
const server = require('./server');
const db = require('./data/dbConfig');
const games = require('./data/gamesModel');

describe('server.js', () => {
    describe('/ route', () => {
        it('should return {API: live}', async () => {
            let response = await request(server).get('/')
            expect(response.body).toEqual({API: 'live'});
        });

        it('should return json', async () => {
            let response = await request(server).get('/')
            expect(response.type).toBe('application/json');
        });
    })

    beforeEach(async () => {
        await db('games').truncate();
    });

    describe('POST /api/games', () => {
        it('should insert provided game', async () => {
            
            let rows = await db('games').where({title: 'Pacman'});
            expect(rows).toHaveLength(0);
        
            await games.insert({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
            await games.insert({ title: 'Super Smash Bros Ultimate', genre: 'Fighting', releaseYear: 2018 });
        
            rows = await db('games').where({ title: 'Pacman' });
            expect(rows).toHaveLength(1);
        
            rows = await db('games');
            expect(rows).toHaveLength(2);
        });

        it('should return status 422 for incomplete body', async () => {
            let response = await request(server).post('/api/games').send({title: '', genre: 'Arcade', releaseYear: 1980 });
            expect(response.status).toBe(422);
        });

        it('should return status 201 on success', async () => {
            let response = await request(server).post('/api/games').send({title: 'Lets Go Pikachu', genre: 'Adventure', releaseYear: 2018 });
            expect(response.status).toBe(201);
        });
    });

    describe('GET /api/games', () => {
        it('should return status 200 on success', async () => {
            let response = await request(server).get('/api/games');
            expect(response.status).toBe(200); 
        });

        it('should return an empty array', async () => {
            let response = await request(server).get('/api/games');
            expect(response.body).toEqual([]);
        });

        it('should return an filled array', async () => {
            await games.insert({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
            await games.insert({ title: 'Super Smash Bros Ultimate', genre: 'Fighting', releaseYear: 2018 });

            let response = await request(server).get('/api/games');
            expect(response.body).toEqual([{ id: 1, title: 'Pacman', genre: 'Arcade', releaseYear: 1980 }, { id: 2, title: 'Super Smash Bros Ultimate', genre: 'Fighting', releaseYear: 2018 }]);
        });
    })

    describe('GET /api/games/:id', () => {
        it('should get the appropriate game', async () => {
            await games.insert({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
            await games.insert({ title: 'Super Smash Bros Ultimate', genre: 'Fighting', releaseYear: 2018 });

            let response = await request(server).get('/api/games/1');
            expect(response.body).toEqual({ id: 1, title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
        });

        it('should get status code 200 on success', async () => {
            await games.insert({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
            await games.insert({ title: 'Super Smash Bros Ultimate', genre: 'Fighting', releaseYear: 2018 });

            let response = await request(server).get('/api/games/1');
            expect(response.status).toBe(200);
        });

        it('should return status 404 for nonexistent id', async () => {
            let response = await request(server).get('/api/games/1');
            expect(response.status).toBe(404);
        });
    })

    describe('DELETE /api/games/:id', () => {
        it('should delete by id, with status 200 for success', async () => {
            await games.insert({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
            await games.insert({ title: 'Super Smash Bros Ultimate', genre: 'Fighting', releaseYear: 2018 });

            let response = await request(server).delete('/api/games/2');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(1);
        });

        it('should return status 404 for nonexistent id', async () => {
            let response = await request(server).delete('/api/games/1');
            expect(response.status).toBe(404);
        });
    })
    
    
});