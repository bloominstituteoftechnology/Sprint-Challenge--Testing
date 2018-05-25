const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./server');
const Game = require('./games/Game');

describe('Games', () => {

    const testGame = {title: 'test game', genre: 'FPS', releaseDate: 'July 04 2018'};
    beforeAll(() => {
        return mongoose
            .connect('mongodb://localhost/test')
            .then(() => console.log('\n=== connected to TEST DB ==='));
    });

    afterAll(() => {
        return mongoose
            .disconnect()
            .then(() => console.log('\n=== disconnected from TEST DB ==='));
    });

    let gameId;
    // // hint - these wont be constants because you'll need to override them.

    beforeEach(() => {
        const newGame = new Game({
            title: 'Batman',
            genre: 'MOBA',
            releaseDate: 'May 25 2018'
        }).save((err, saveGame) => {

            if (err) {
                console.log('There was a problem saving the game');
                return;
            }
            else {
                gameId = saveGame.id;
                console.log('Game was saved');
            }
        });

    });

    afterEach(() => {
        //   // clear collection.
        Game.remove({}, err => {

            if (err) console.log('There was a problem removing the game');
            else console.log('The game was removed successfully');
        });
    });


    // test the POST here
    it('should create a new game', async () => {
        const game = {title: 'My Test Game', genre: 'FPS', releaseDate: 'May 25 2018'};

        const respone = await request(server)
            .post('/api/games')
            .send(game);
        expect(respone.status).toBe(201);
        expect(respone.body).toHaveProperty("_id");
        expect(respone.body).toHaveProperty("title");
        expect(respone.body).toHaveProperty("genre");
        expect(respone.body).toHaveProperty("releaseDate");
        expect(respone.body.title).toEqual('My Test Game');
        expect(respone.body.genre).toEqual('FPS');
        expect(respone.body.releaseDate).toEqual('May 25 2018');
    });
    // test the GET here
    // Test the DELETE here
});
