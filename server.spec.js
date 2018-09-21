const request = require('supertest');
 const server = require('./server.js');

 const games = [
    { title: "Pacman", genre: "Arcade"},
    { title: "Galaga", genre: "Arcade" },
    { title: "Pong", genre: "Arcade" },
  ];

 describe('server.js', () => {
    it('runs test', () => {
        expect(true).toBeTruthy();
    });

    describe("GET request to /games", () => {

        it("should return the list of games and genre", async () => {
          const response = await request(server).get("/games");
          expect(response.body).toEqual(games);
        });

        it("should return an array of games and genres", async () => {
            const response = await request(server).get("/games");
            expect(Array.isArray(games)).toBeTruthy();
          });

          it("should return status code 200", async () => {
            const response = await request(server).get("/games");
            expect(response.status).toEqual(200);
          });
      });
      
      describe('POST /games', () => {
        it('should return a 422 status code if no title is provided', async () => {
            let game = { title: '' }
             const response = await request(server)
            .post('/games')
            .send(game)
             expect(response.status).toEqual(422);
        });
        it('should return a 422 status code if no genre is provided', async () => {
            let game = { genre:'' }
             const response = await request(server)
            .post('/games')
            .send(game)
             expect(response.status).toEqual(422);
        });
        it('should add a new game to games array', async () => {
            const response = await request(server)
            .post('/games')
            .send({ title: "DigDug", genre: "Arcade" });
            const expectedBody =  [
                { title: 'Pacman' , genre: 'Arcade' },
                { title: 'Galaga', genre: 'Arcade' },
                { title: 'Pong' , genre: 'Arcade' },
                { title: "DigDug", genre: "Arcade" }
        ]
            expect(response.body).toEqual(expectedBody);
        });

    });
 });