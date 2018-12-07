const request = require('supertest');
const server = require('./api/server.js');


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
      // it('should return list of games', async () => {
      //   const response = await request(server).get('/games');
      //   const expected = [
      //     {'id': 1, 'title': 'Some game', 'genre': 'Arcade'},
      //     {'id': 2, 'title': 'Another game', 'genre': 'Arcade'},
      //     {'id': 3, 'title': 'some other game', 'genre': 'Arcade'}
      //   ];
      //   expect(Array.isArray(response.body)).toBe(true);
      //   expect(response.body.length).toEqual(3);
      //   expect(response.body).toEqual(expected);
      // })
    });


    describe('POST /games', () => {

        it('should add game to array', async () => {
            const game = { title: 'Pacman', genre: 'Arcade'};
            const response = await request(server)
            .post(`/games`)
            .send({ game });
            expect(response.body).toBeTruthy();
        });

        it('should return status of 201 if created', () => {
            const game = { title: 'Pacman', genre: 'Arcade' };
            return request(server)
            .post(`/games`)
            .send(game)
            .then(res => {
                expect(res.status).toEqual(201)
            })
            
        });
        it('should return error if missing data', async () => {
            const game = { title: 'Duck Hunt'};
            const response = await request(server)
            .post(`/games`)
            .send({ game });
            expect(response.status).toBe(422);
        });
    });

    describe('DELETE /games/:id', () => {
      
        it('should return 404 if no game at id', async () => {
            const id = 200;
            const response = await request(server)
            .delete(`/games/${id}`)
            expect(response.status).toEqual(404);
        });

        it('should return { message: No games found to update }', async () => {
            const id = 100;
            const response = await request(server)
            .delete(`/games/${id}`)
            expect(response.body).toEqual({ message: 'No games found to delete' });
        });

        
    })
   
}) 