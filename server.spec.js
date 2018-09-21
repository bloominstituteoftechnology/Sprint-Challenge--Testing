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

      });

 });