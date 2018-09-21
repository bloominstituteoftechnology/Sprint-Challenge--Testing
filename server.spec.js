const request = require('supertest');
 const server = require('./server.js');

 const games = [
    { id: "1", title: "Pacman", genre: "Arcade"},
    { id: "2", title: "Galaga", genre: "Arcade" },
    { id: "3", title: "Pong", genre: "Arcade" },
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
      });
      
      describe('POST /games', () => {
        it('should return a 422 status code if no title is provided', async () => {
            let game = { title: '', genre:'' }
             const response = await request(server)
            .post('/games')
            .send(game)
             expect(response.status).toEqual(422);
        });
        it('should return a 422 status code if no genre is provided', async () => {
            let game = { title: '', genre:'' }
             const response = await request(server)
            .post('/games')
            .send(game)
             expect(response.status).toEqual(422);
        });

    });
 });