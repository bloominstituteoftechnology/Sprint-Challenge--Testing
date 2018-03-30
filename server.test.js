const mongoose = require('mongoose');
const server = require('./server');

const chai = require('chai');
const { expect } = chai;
const chaiHTTP = require('chai-http');
const sinon = require('sinon');
chai.use(chaiHTTP);

const Game = require('./models');

describe('Games', () => {
   before(done => {
      mongoose.Promise = global.Promise;
      mongoose.connect('mongodb://localhost/game_test');
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
   let gameId = null;
   let testGame = null;
   beforeEach(done => {
      // write a beforeEach hook that will populate your test DB with data
      // each time this hook runs, you should save a document to your db
      // by saving the document you'll be able to use it in each of your `it` blocks
      const myGame = new Game({
         title: 'Final Fantasy VII',
         genre: 'RPG',
         releaseDate: 'January 1997',
      });
      myGame
         .save()
         .then(game => {
            testGame = game;
            gameId = game._id;
            done();
         })
         .catch(err => {
            console.error(err);
            done();
         });
   });

   afterEach(done => {
      // simply remove the collections from your DB.
      Game.remove({}, err => {
         if (err) console.err(err);
         done();
      });
   });

   // test the POST here
   describe(`[POST] /api/game/create`, () => {
      it('should post a game to the db', done => {
         const myGame = {
            title: 'Counter-strike: Source',
            genre: 'FPS',
            releaseDate: 'November 2004',
         };
         chai
            .request(server)
            .post('/api/game/create')
            .send(myGame)
            .end((err, res) => {
               expect(res.status).to.equal(200);
               expect(res.body.title).to.equal('Counter-strike: Source');
            });
         done();
      });

      it('should send 422 with invalid data', done => {
         const myGame = {
          title: 'Counter-strike: Source',
          genre: 'FPS',
          releaseDate: true,
         };
         chai
            .request(server)
            .post('/api/game/create')
            .send(myGame)
            .end((err, res) => {
               if (err) {
                  expect(err.status).to.equal(422);
                  const { error } = err.response.body;
                  expect(error).to.equal('Error saving data to the DB');
                }
                done();
            });
      });
   });

  // test the GET here
  describe(`[GET] /api/game/get`, () => {
    it('should get all games in db', (done) => {
      chai.request(server).get('/api/game/get').end((err, res) => {
        if (err) {
          throw new Error(err);
          done();
        }
        expect(res.body[0].title).to.equal(testGame.title);
        expect(res.body[0]._id).to.equal(String(gameId));
        done();
      });
    });
  });
  // test the PUT here

  // --- Stretch Problem ---
  // Test the DELETE here
});
