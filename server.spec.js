const request = require('supertest');
const server = require('./server.js');

describe('server.js', ()=> {
    describe('/', ()=> {
        it('should return a 200 status code', ()=> {
            let response;
            const expectedCode = 200;
            return request(server).get('/').then(res=> {
                response = res;
                expect(response.status).toEqual(expectedCode);
            })
        });

        it('should return a JSON object fron the index route', async () => {
            const expectedBody = { message: "Hi :)" };
      
            const response = await request(server).get('/');
      
            expect(response.body).toEqual(expectedBody);
        });

    });

    describe('GET /ourgames', ()=> {
        it('should return a 200 OK status', ()=> {
            let response;
            const expected = 200;
            return request(server).get('/ourgames').then(res=> {
                response = res;
                expect(response.status).toEqual(expected);
            })
        });

        it('should return a JSON object', async ()=> {
            const expected = { games: "Racing Game" };
            const response = await request(server).get('/ourgames');
            expect(response.body).toEqual(expected);
        });

        it('should return 404 not found if there are no games', async ()=> {
            const expected = {message: "There are no games available"};
            const response = await request(server).get('/ourgames');
            expect(response.body).toEqual(expected);
        });
    });

    describe('POST /game', ()=> {
        it('should return a 201 Created', ()=> {
            let response;
            const expected = 201;
            return request(server).post('/game').then(res=> {
                response = res;
                expect(response.status).toEqual(expected);
            });
        });

        it('should return a JSON object with the title of the game', async ()=> {
            const title = 'Hunting Game';
            const expected = {game: "The new game is titled Hunting Game"};
            const response = await request(server).post('/game');
            expect(response.body).toEqual(expected);
        });

        it('should return a 400 Bad Request if no title is given', async ()=> {
            const expected = {message: "This game is untitled for now"};
            const response = await request(server).post('/game');
            expect(response.body).toEqual(expected);
        });
    });   
});
