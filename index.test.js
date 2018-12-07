const request = require('supertest');
const server = require('./server');

describe('server.js', () => {
    it('runs tests', () => {
        expect(true).toBeTruthy();
    })
     // runs tests
    describe('POST /games', () => {
    it('should post a game', async () => {
        const title = 'Tomb Raider';
        const genre = 'Idk';
        const releaseYear = 1999;
        const expected = { message: 'Tomb Raider Idk from 1999 has been added!' };

        const response = await request(server)
        .post('/games')
        .send({title, genre, releaseYear});
        expect(response.body).toEqual(expected);
      }); 

    it('should return a 422 code if information is missing', async () => {
        const newGame = {
            title: 'Something',
            releaseYear: '1200'
        };

        const response = await request(server)
        .post('/games')
        .send(newGame);
        expect(response.status).toBe(422);
    }); // should return a 422 code if information is missing

    it('should return a 200 code if a new game is posted successfully', async () => {
        const newGame = {
          title: 'Master Game',
          genre: 'Arcade',
          releaseYear: '1988'
        };
        
        const response = await request(server)
        .post('/games')
        .send(newGame);
        expect(response.status).toBe(200);
      }); // should return a 200 code if a new game is posted successfully
    });

    describe('GET /games', () => {
        it('should return games', async () => {
            const response = await request(server)
            .get('/games');
            expect(response.type).toBe('application/json');
        }); 

        it('should return a 200 code if a game is retrieved successfully', async () => {
            const response = await request(server)
            .get('/games');
            expect(response.status).toBe(200);
        }); 
        
        it('should return an array', async () => {
            const response = await request(server)
            .get('/games');
            expect(Array.isArray(response.body)).toBe(true);
        }); 
    }) 
    // stretch
    describe('***GET /games/:id', () => {
        it('should return a list of found games', async () => {
        const response = await request(server).get('/games/1');
        const expected = [
            {
                id: 1,
                title: 'The Oregon Trail',
                genre: 'Survival',
                releaseYear: 1995
            },
        ];
        expect(response.body).toEqual(expected);
    }); // should return a list of the game
    
    it('should return 404 code if the game was not found', async () => {
        const response = await request(server)
        .get('/games/22');
        expect(response.status).toBe(404);
      }); 
    }); // GET /games/:id
}) // server.js