const server = require('./server');
const Game = require('./models');

const mongoose = require('mongoose');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
chai.use(chaiHTTP);

describe('Games', () => {
    before(done => {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/test');
        const db = mongoose.connection;
        db.on('error', () => console.error.bind(console, 'connection error'));
        db.once('open', () => {
            console.log('we are connected');
            done();
        });
    });

    after(done => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
            console.log('we are disconnected');
        });
    });
    // declare some global variables for use of testing
    // hint - these wont be constants because you'll need to override them.
    let newGame = {
        title: 'Final Fantasy',
        genre: 'RPG',
        releaseDate: 'December 18th, 1987'
    };
    let update = {
        title: 'Donkey Kong',
        genre: 'Platform',
        releaseDate: 'July 9th, 1981'
    };

    beforeEach(done => {
        // write a beforeEach hook that will populate your test DB with data
        // each time this hook runs, you should save a document to your db
        // by saving the document you'll be able to use it in each of your `it` blocks
        new Game({
            title: 'Jackal',
            genre: 'Top Scrolling Shooter',
            releaseDate: 'June 27th, 1986'
        }).save((err, savedGame) => {
            if (err) {
                console.log(err);
                return done();
            }
            gameId = savedGame.id;
            done();
        });
    });
    afterEach(done => {
        // simply remove the collections from your DB.
        Game.remove()
            .then(() => done())
            .catch(err => done(err));
    });

    // test the POST here
    describe(`[POST] /api/game/create`, () => {
        it('should create a new game', done => {
            chai
                .request(server)
                .post('/api/game/create')
                .send(newGame)
                .then(res => {
                    expect(res.status).to.equal(201);
                    expect(res.body.game.title).to.equal('Final Fantasy');
                    done();
                })
                .catch(err => done(err));
        });
    });
    // test the GET here
    describe(`[GET] /api/game/get`, () => {
        it('should return all the games', done => {
            chai
                .request(server)
                .get('/api/game/get')
                .then(res => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0].title).to.equal('Jackal');
                    done();
                })
                .catch(err => done(err));
        });
    });
    // test the PUT here
    describe(`[PUT] /api/game/update`, () => {
        it('should update the game with the given id', done => {
            chai
                .request(server)
                .put(`/api/game/${gameId}`)
                .send(update)
                .then(res => {
                    expect(res.status).to.equal(200);
                    expect(res.body.title).to.equal('Donkey Kong');
                    expect(res.body.releaseDate).to.equal('July 9th, 1981');
                    done();
                })
                .catch(err => done(err));
        });
    });
    // --- Stretch Problem ---
    // Test the DELETE here
    describe(`[DELETE] /api/game/destroy/:id`, () => {
        it('should delete the game with the given id', done => {
            chai
                .request(server)
                .delete(`/api/game/destroy/${gameId}`)
                .then(res => {
                    expect(res.status).to.equal(200);
                    done();
                })
                .catch(err => done(err));
        });
    });
});
