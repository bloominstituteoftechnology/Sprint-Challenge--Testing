const request = require('supertest');
const server = require('./server.js');

describe('server.js testing', () => {

    describe('testing /games GET endpoint', () => {

        it('should respond with status code 200 OK', async () => {
            let response = await request(server).get('/games');
      
            expect(response.status).toBe(200);
        });

        it('should always return an array, even if there are no games stored', async () => {

            let response = await request(server).get('/games');
            
            let games = await response.body;
            
            const expected = games.map(game => game);

            expect(games).toEqual(expected);
        });

        it('should respond with JSON', async () => {
            let response = await request(server).get('/games');
      
            expect(response.type).toMatch(/json/i);
        });

    });

    describe('testing /games POST endpoint', () => {

        it('should add a new game to the database', async () => {
            const body = { title: 'Super Mario Bros.', genre: 'Platformer', releaseYear: 1983 };
      
            let response = await request(server)
              .post('/games')
              .send(body);
      
            expect(response.status).toBe(201);
      
          });

        
        it("should return 422 if game's title or game's genre is missing", async () => {
            let response = await request(server)
            .post('/games')
            .send({ title: 'Super Mario Bros.' });
            expect(response.status).toBe(422);
    
            response = await request(server)
            .post('/games')
            .send({ genre: 'Platformer' });
            expect(response.status).toBe(422);
        });

        it("should return 422 if game's title or game's genre is a not a string", async () => {
            const body1 =  { title: true, genre: 'Platformer', releaseYear: 1983 };
            const body2 = { title: 'Super Mario Bros.', genre: 55, releaseYear: 1983 };

            let response = await request(server)
            .post('/games')
            .send(body1);
            expect(response.status).toBe(422);
    
            response = await request(server)
            .post('/games')
            .send(body2);
            expect(response.status).toBe(422);
        });

    });

});