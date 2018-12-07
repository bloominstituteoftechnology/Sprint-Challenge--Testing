const request = require('supertest');
const server = require('./api/server.js');

describe('server.js', () => {

    describe('/ route', () => {
        
        it('should return status code of 200', async () => {
            let response = await request(server).get('/');
            expect(response.status).toBe(200);
        })

        it('should return JSON', async () => {
            let response = await request(server).get('/');
            expect(response.type).toBe('application/json');
        });
    })

    /* 
    ===POST===
    -If the information is incomplete, return a 422 status code.
    - verify that the endpoint returns the correct HTTP status code 201 when receiving correct 
    - should be JSON data
    - shuold return same object as input */
    describe('POST /games route', () => {
       
        it('should return 422 if data is incomplete', async () => {
            const game = {"game": "My New Game"}
            const response = await request(server).post('/games').send(game);
            expect(response.status).toBe(422)
        });
    
        it('should return 201 if game is correctly added', async () => {
            const game = {"title": "Checkers", "genre": "Board", "releaseYear": 1800}
            const response = await request(server).post('/games').send(game);
            expect(response.status).toBe(201)
        });
    
        it("should return JSON", async () => {
            const game = { title: "Pacman", genre: "Arcade", releaseYear: 1980 };
            const response = await request(server).post("/games").send(game);
            expect(response.type).toBe("application/json");
        });
        
        it("should return same object as input", async () => {
            const game = { title: "Pacman", genre: "Arcade", releaseYear: 1980 };
            const response = await request(server).post("/games").send(game);
            expect(response.body).toEqual(game);
        });
    })

    /* 
    ===GET===
    -Should return list of games in an array.
    -Should return status code of 200 
    -should always return array, even if empty
    - */
    describe('GET /games route', () => {
       
        it('should return 200', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toBe(200)
        });
        
        it('should return list of games in array', async () => {
            const response = await request(server).get('/games');
            expect(Array.isArray(response.body)).toBeTruthy();
        });
        
        it('should return empty array', async () => {
            const response = await request(server).get('/games');
            expect(response.body).toEqual([])
        });

    })
})