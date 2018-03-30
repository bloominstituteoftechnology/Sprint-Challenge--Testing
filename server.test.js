const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

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
  let id = '';
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    new Game({
      title: 'Diablo 1',
      genre: 'RPG',
      releaseDate: '2001',
    }).save((err, res) => {
      if (err) {
        console.log(err);
        done();
      }
      id = res._id;
      done();
    });
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) {
        console.log(err);
      };
      done();
    });
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it('should add a new game', (done) => {
      const newGame = {
        title: 'Diablo 2',
        genre: 'RPG',
        releaseDate: '2004',
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
          if (err) {
            console.log(err);
            done();
          };
          expect(res.status).to.equal(201);
          expect(res.body.title).to.equal('Diablo 2');
          done();
        });
    });
  });

  // test the GET here
  describe('[GET] /api/game/get', () => {
    it('should return all the games', (done) => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            console.log(err);
            done();
          };
          expect(res.status).to.equal(200);
          expect(res.body[0].title).to.equal('Diablo 2');
          done();
        });
    });
  });

  // test the PUT here
  describe('[GET] /api/game/update', () => {
    it('should update the game', (done) => {
      let update = {
        title: 'Diablo 3',
        genre: 'RPG',
        releaseDate: '2015',
      }
      chai
        .request(server)
        .put(`/api/game/update/${id}`)
        .send(update)
        .end((err, res) => {
          if (err) {
            console.log(err);
            done();
          };
          expect(res.status).to.equal(201);
          expect(res.body[0].title).to.equal('Diablo 3');
          done();
        });
    });
  });

  // --- Stretch Problem ---
  // Test the DELETE here
  describe('[DELETE] /api/game/destroy', () => {
    it('should delete the game', (done) => {
      chai
        .request(server)
        .delete(`/api/game/destroy/${id}`)
        .end((err, res) => {
          if (err) {
            console.log(err);
            done();
          };
        });
    });
  });
});
