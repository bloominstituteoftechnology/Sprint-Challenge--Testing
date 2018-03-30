const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server');
const chaihttp = require('chai-http');

const Game = require('./models');

chai.use(chaihttp);

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
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    new Game({
      title: 'Mario Bros',
      genre: 'Platform',
      releaseDate: 'June 1986',
    }).save((err, savedWeapon) => {
      if (err) {
        console.log('There was an error saving the document in the beforeEach hook');
        console.log(err);
        done();
      }
    })
    new Game({
      title: 'Tetris',
      genre: 'Puzzle',
    }).save((err, savedWeapon) => {
      if (err) {
        console.log('There was an error saving the document in the beforeEach hook');
        console.log(err);
        done();
      }
      done();
    })
  });
  afterEach(done => {
    Game.remove({}, err => {
      if (err) {
        console.log('There was an error removing the data in the afterEach hook');
        done()
      }
      done();
    });
  });

  describe('[POST] api/game/post', () => {
    const newGame = {
      title: 'Donkey Kong',
      genre: 'Platformer',
    };
    it('should post the new game to the database', () => {
      chai
        .request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(res.body.title).to.equal('Donkey Kong');
        })
    })
  });

  });

  // test the PUT here

  // --- Stretch Problem ---
  // Test the DELETE here
});
