const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

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
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  let marioId = null;
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    new Game({
      title: 'Super Mario Bro',
      genre: 'Platform Game'
    }).save((err, game) => {
      if (err) {
        console.log(err);
        done();
      }
      marioId = game._id;
      done();
    });
  });

  // afterEach(done => {
  //   console.log('afterEach');
  //   // simply remove the collections from your DB.
  //     Game.remove({}, (err) => {
  //     if (err) console.log(err);
  //     done();
  //   });
  // });

  // test the GET here
  describe('[GET] /api/game/get', () => {
    it('should return a list of games', (done) => {
      chai.request(server)
      .get('/api/game/get')
      .end((err, res) => {
        if (err) console.error(err);
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(1);
          expect(res.body[0].title).to.equal('Super Mario Bro');
      });
      done();
    });
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it('should add a new game', (done) => {
      const newGame = {
        title: 'Contra',
        genre: "Shoot 'em up'",
        releaseDate: 'February 20, 1987'
      };
      chai.request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Contra');
          expect(res.body.genre).to.equal("Shoot 'em up'");
          expect(res.body).to.have.own.property('_id');
        });
        done();
    });
  });


  // test the PUT here
    describe('[PUT] /api/game/update', () => {
    it('should update a game', (done) => {
      const updateGame = {
        title: 'Super Mario',
        id: marioId
      };
      chai.request(server)
        .put('/api/game/update')
        .send(updateGame)
        .end((err, res) => {
          //this console log doesn't run and nothing from res
          console.log('GOT RESPONSE BACK FROM PUT METHOD');
          console.log('put res', res);
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          //this test should obviously fail but nothing happen
          expect(res.body.title).to.equal('Super Mljkhlhklhjario');
        });
        done();
    });
  });

  // --- Stretch Problem ---
  // Test the DELETE here
});
