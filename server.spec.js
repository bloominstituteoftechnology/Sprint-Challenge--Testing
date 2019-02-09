const request = require('supertest');
const server = require('./games_server.js');
const games = require('./Data/games_data');



describe('Testing game server', () => { //testing get endpoint
    describe('Get Games route test', () => {
        it('should return a list of games ', async () => {
            const expectStatus = 200;
            const response = await request(server).get('/api/games');
            expect(response.status).toEqual(expectStatus);
            expect(response.body).toEqual(games);
            expect(response.body).toBeDefined();

        })
    })
    describe('Post Game route test', () => {
        it('should post a new game ', async () => {
            const expectStatus = 201;
            const game = { title: "Mega Man", genre: "Arcade", releaseYear: 1987,};
            const response = await request(server).post('/api/games').send(game);
            expect(response.status).toEqual(expectStatus);
        })
    })

})





