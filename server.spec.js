const request = require('supertest');
const server = require('./server');

describe('server.js', () => {
    describe('GET games', () => {
        it('should return a 200 status code', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toBe(200);
        });

        it('should return an array', async () => {
            const response = await request(server).get('/games');
            expect(Array.isArray(response.body)).toBeTruthy();
          });

        it('should return a list of games', async () => {
            const response = await request(server).get('/games');
            const expected = [
                { 
                    id: 1,
                    title: 'Pacman', 
                    genre: 'Arcade', 
                    releaseYear: 1980
                },
                {
                    id: 2,
                    title: 'Super Mario', 
                    genre: 'Platformer', 
                    releaseYear: 1985 
                }
            ]
            expect(response.body).toEqual(expected);
        });
    });
    describe('POST games', () => {
        it('should return a status code of 422 if missing information', async () => {
            const response = await request(server)
            .post('/games')
            .send({ title: '1234' });
            expect(response.status).toBe(422);
        });

        it('should return a status code of 405 if title already exists', async () => {
            const response = await request(server)
              .post('/games')
              .send({ title: 'Pacman', genre: 'Arcade' });
            expect(response.status).toBe(405);
          });

        it('should return games if succesfully added', async () => {
            const response = await request(server)
            .post('/games')
            .send({
                title: 'World of Warcraft', 
                genre: 'MMORPG',
                releaseYear: 2004
            });
            const expected = [
                {
                    id: 1,
                    title: 'Pacman', 
                    genre: 'Arcade', 
                    releaseYear: 1980 
                },
                {
                    id: 2,
                    title: 'Super Mario', 
                    genre: 'Platformer', 
                    releaseYear: 1985 
                },
                {
                    id: 3,
                    title: 'World of Warcraft', 
                    genre: 'MMORPG',
                    releaseYear: 2004
                }
            ];
            expect(response.body).toEqual(expected);
        });
        
        it('should return a status code of 201 if successful', async() => {
            const response = await request(server)
            .post('/games')
            .send({
                title: 'TEST TITLE',
                genre: 'NO GENRE'
            });
            expect(response.status).toBe(201);
        });
    });
});