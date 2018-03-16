const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaihttp = require('chai-http');

const server = require('./server');
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
    const game = new Game({
      title: 'Destiny 2',
      genre: 'ShootEmUp'
    });
    game
      .save()
      .then(_ => {
        newFile = game.id;
        done();
      })
      .catch(err => ({ err: `game saveFile corrupted` }));
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove()
      .then(_ => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  // test the POST here
  describe('[POST] /api/game/create', _ => {
    it(`should post correctly to database`, _ => {
      const newGame = new Game({
        title: 'California Games',
        genre: 'Sports',
        date: 'June 1987'
      });
      chai
        .request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('California Games');
        });
    });
  });

  // test the GET here

  // test the PUT here

  // --- Stretch Problem ---
  // Test the DELETE here
});
