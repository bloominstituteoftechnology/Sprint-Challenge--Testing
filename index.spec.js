const request = require('supertest');
const server = require('./server.js');
const db = require('./data/dbconfig.js');

describe("server.js", () => {
    describe("Test the root path", () => {
      it("should return status code 200", async () => {
        let response = await request(server).get("/");
        expect(response.status).toBe(200);
      });

      it('should return with a body like: { api: "alive" }', async () => {
        let response = await request(server).get('/');
        
        expect(response.body).toEqual({ api: 'alive' });
        });
    });

    afterAll(async () => {
        await db('games').truncate();
      });

     describe("POST /games", async () => {
      it("should return status code 200", async () => {
        const body = { title: 'Pacman', genre: 'Arcade', releaseYear: 1980 };
        let response = await request(server).post("/games").send(body);

        expect(response.status).toBe(200);
      });

       it("should return status of 422", async () => {
        const body = { title: 'Pacman' };
        let response = await request(server).post("/games").send(body);

        expect(response.status).toBe(422);
      });

      it('should return JSON', async () => {
        let response = await request(server).post('/games');
        
        expect(response.type).toBe('application/json');
    });
    });
    describe('GET /games', () => {
        it('should return status code 200', async () => {
            let response = await request(server).get('/games');
            
            expect(response.status).toBe(200);
        });

        it('should return JSON', async () => {
            let response = await request(server).post('/games');
            
            expect(response.type).toBe('application/json');
        });

        it("should return an array", async () => {
            const body = { title: "Pacman", genre: "Arcade", releaseYear: null };
            const response = await request(server)
              .get("/games")
              .send(body);
        
            expect(response.body).toEqual([body]);
          });
    });
  }); 