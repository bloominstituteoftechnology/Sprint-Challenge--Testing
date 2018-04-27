const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server.js');
const Game = require('./models');

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
  let gameId;
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const testGame = {
      title: 'Super Mario World',
      genre: 'Platforming',
      releaseDate: 'November 1990',
    };
    Game.create(testGame, (err, test) => {
      gameId = test._id;
      if (err) return err;
    });
    done();
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) return err;
    });
    done();
  });

  describe('[POST] to /api/game/create', () => {
    it('should do add a new game to the database', done => {
      chai
        .request(server)
        .post('/api/game/create')
        .send({
          'title': 'California Games',
          'genre': 'Sports',
          'releaseDate': 'June 1987',
        })
        .end(function(err, res) {
          expect(res.body[0]._id).to.equal(`${gameId}`);
        });
        done();
    });
    it('if title and genre are not provided throws error', done => {
      chai
        .request(server)
        .post('/api/game/create')
        .send({
          'genre': 'Sports',
          'releaseDate': 'June 1987',
        })
        .end(function(err, res) {
          expect(res).to.have.status(422);
        });
        done();
    });
  });

  describe('[GET] to /api/game/get', done => {
    it('should return games in the database', () => {
      chai
        .request(server)
        .get('/api/game/get')
        .end(function(err, res) {
          if (err) expect(err).to.have.status(666);
          expect(res.body[0]._id).to.equal(`${gameId}`);
        });
    });
  });

  describe('[DELETE] to /api/game/destroy/:id', done => {
    it('should delete an id', () => {
      chai
        .request(server)
        .delete(`/api/game/destroy/${gameId}`)
        .end(function(err, res) {
          if (err) expect(err).to.have.status(422);
          expect(res.body).to.have.property('success')
          done();
        });
    });
    it('if not found throws an error', () => {
      chai
        .request(server)
        .delete(`/api/game/destroy/3`)
        .end(function(err, res) {
          if (err) expect(err).to.have.status(422);
        });
    });
  });

  // describe('[PUT] to /api/game/update', done => {
  //   it('should do x', () => {
  //     chai
  //       .request(server)
  //       .put('/api/game/update')
  //       .send({
  //         'title': 'California Gamez',
  //         'id': '999',
  //       })
  //       .end(function(err, res) {
  //         if (err) expect(err).to.have.status(666);
  //         expect(res).to.have.status(666);
  //         done();
  //       });
  //   });
  // });
});
