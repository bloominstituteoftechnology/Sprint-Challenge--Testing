const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server.js');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP)

const Game = require('./models');

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
  let gameId;
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    const newGame = new Game({
      title: 'Fortnite',
      genre: 'Battle Royale',
      releaseDate: '2017'
    });

    newGame.save((err, response) => {
      if (err) {
        console.log('ERROR: ', err);
        done();
      } else {
        gameId = newGame.id
        done();
      }
    });

    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) {
        console.log('Remove ERROR: ', err)
      }
      return done();
    });
  });

  // test the POST here
  describe(`[POST] /api/game/create`, () => {
    it('should post a game to the database', done => {
      const game = new Game({
        title: 'Sonic',
        genre: 'arcade',
        releaseDate: '90s'
      });
      chai
        .request(server)
        .post('/api/game/create')
        .send(game)
        .end((err, response) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(response.status).to.equal(200);
          expect(response.body.title).to.equal('Sonic');
          return done();
        });
    });
  });

  // test the GET here
  describe(`[GET] /api/game/get`, () => {
    it('should return a list of all games stored in the DB', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, response) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(response.status).to.equal(200);
          expect(response.body[0].title).to.equal('Fortnite');
          return done();
        });
    });
  });

  // Test the DELETE here
  describe(`[DELETE] /api/game/destroy/:id`, () => {
    it('should remove the correct game from the DB', done => {
      let game = new Game ({
        title: 'Resident Evil',
        genre: 'Horror',
        releaseDate: '90s'
      });
      game.save((err, game) => {
        chai
          .request(server)
          .delete('/api/game/destroy/' + `${gameId}`)
          .end((err, response) => {
            if (err) {
              console.log(err);
              return done();
            }
            expect(response.status).to.equal(200);
            return done();
          })
      })
    })
  })


  
  // --- Stretch Problem ---
  // test the PUT here
});
