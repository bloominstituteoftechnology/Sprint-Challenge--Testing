const request = require('supertest');
const getType = require('jest-get-type');
const server = require('./server.js');

const defaultGame = {
    title: 'Rampage',
    genre: 'arcade',
  };

// ========== SERVER TEST ========== //
  describe('server.js', () => {
    it('should return status code 200 (OK)', async () => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
    });

// ========== POST TESTS ========== //
    describe('POST /games', () => {
        it('should return status code 422 if no title is provided', async () => {
            let game = { ...defaultGame, title: '' }
            const response = await request(server)
            .post('/games')
            .send(game)
            expect(response.status).toEqual(422);
        });
        it('should return status code 422 if no genre is provided', async () => {
            let game = { ...defaultGame, genre: '' }
            const response = await request(server)
            .post('/games')
            .send(game)
            expect(response.status).toEqual(422);
        });
        it('should return status code 201 if all required fields are provided', async () => {
            let game = { ...defaultGame }
            const response = await request(server)
            .post('/games')
            .send(game)
            expect(response.status).toEqual(201);
        });
        it('should return the provided object', async () => {
            let game = { ...defaultGame, title: 'Duck Hunt' }
            const response = await request(server)
            .post('/games')
            .send(game)
            expect(response.body).toEqual({ title: 'Duck Hunt', genre: 'arcade' });
        });
        it('should return status code 405 if the title already exists', async () => {
            let game = { ...defaultGame }
            const response = await request(server)
            .post('/games')
            .send(game)
            expect(response.status).toEqual(405);
        });
    });

// ========== GET TESTS ========== //
    describe('GET /games', () => {
        it('should return status code 200 (OK)', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toEqual(200);
        });
        it('should return an array in the response body', async () => {
            const response = await request(server).get('/games');
    
            const type = getType(response.body);
            expect(type).toEqual('array');
        });
        it("should return JSON", async () => {
            const response = await request(server).get('/games');
            expect(response.type).toBe("application/json");
          });
        it('should return an array of games', async () => {
            const response = await request(server).get('/games');
            const expected = [
                {
                    title: 'Rampage',
                    genre: 'arcade',
                },
                {
                    title: 'Duck Hunt',
                    genre: 'arcade',
                
                }
              ]
            expect(response.body).toEqual(expected);
        });
    });

});