const request = require('supertest');
const server = require('./api/server');

describe('server', () => {
    describe('GET /games', () => {

      it('should return status code 200(OK)', async () => {
        const response = await request(server).get('/games');

        expect(response.status).toBe(200);
      });

      it('should return JSON', async () => {
        const response = await request(server).get('/games');

        expect(response.type).toBe('application/json');
      });

      it('should return empty array if no games', async () => {
        const response = await request(server).get('/games');

        expect(response.body).toEqual([]);
      })
    });

    describe('POST /games', () => {
        it('should add game to array', async () => {
            const game = { title: 'PUBG', genre: 'battle royale'};
            
            
            const response = await request(server)
            .post(`/games`)
            .send({ game });

            expect(response.body).toBeTruthy();
        });

        it('should return status of 201 if okay', () => {
            const game = { title: 'PUBG', genre: 'battle royale' };
            
            
            return request(server)
            .post(`/games`)
            .send(game)
            .then(res => {
                expect(res.status).toEqual(201)
            })

            // expect(response.status).toBe(201);
        });

        it('should return error if missing data', async () => {
            const game = { title: 'Red Dead'};
            const response = await request(server)
            .post(`/games`)
            .send({ game });
            expect(response.status).toBe(422);
        });
    });

    describe('DELETE /games/:id', () => {
        
        it('should return 404 if no game at id', async () => {
            const id = 70;
            
            
            const response = await request(server)
            .delete(`/games/${id}`)
            .send({ id });

            expect(response.status).toEqual(404);
        })

        it('should return { message: No records found to update }', async () => {
            const id = 70;
            
            
            const response = await request(server)
            .delete(`/games/${id}`)
            .send({ id });

            expect(response.body).toEqual({ message: 'No records found to delete' });
        })
    })
    it('can run tests', () => {
        expect(true).toBeTruthy();
    });

    it('can run more tests', () => {
        expect(false).toBeFalsy();
    });
})