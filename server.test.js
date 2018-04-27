const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const Game = require('./models');

describe('Games', () => {
  before(done => {
    // mongoose.Promise = global.Promise;
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
    Game.create({
      title: 'Super Mario Bros.',
      genre: 'Platformer',
      releaseDate: '1985',
    })
      .then(response => {
        console.log(response, 'added');
        gameId = response._id;
        done();
      })
      .catch(err => console.log(err));
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({})
      .then(() => {
        console.log('database cleared');
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it('should add a game to the database', done => {
      chai
        .request(server)
        .post(`/api/game/create`)
        .send({ title: 'paperboy', genre: 'fun' })
        .end((err, response) => {
          if (err) {
            console.log(err);
          } else {
            expect(response.body).to.haveOwnProperty('_id');
            expect(response.body.title).to.be.ok;
            expect(response.body).to.haveOwnProperty('genre');
            expect(response.body.title).to.equal('paperboy');
            expect(response.body.genre).to.equal('fun');
            done();
          }
        });
      // .then(response.body => {
      //   console.log(response.body, 'get response');
      //   // expect(response.body).to.haveOwnProperty('id');
      //   expect(response.body.title).to.be.ok;
      //   expect(response.body).to.haveOwnProperty('genre');
      //   expect(response.body.title).to.equal('paperboy');
      //   expect(response.body.genre).to.equal('fun');
      // })
      // .catch(err => console.log(err, 'error'));
    });
  });

  // test the GET here
  describe('[GET] /api/game/get', () => {
    it('should return an array of games from the database', done => {
      console.log(gameId, 'gameId');
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, response) => {
          if (err) {
            console.log(err);
          } else {
            expect(response.body).to.be.an('array');
            expect(response.body).to.have.lengthOf(1);
            done();
          }
        });

      // .then(response => {
      //   expect(response.body).to.be.an('arbray');
      //   expect(response.body).to.have.lengthOf(1);
      // })
      // .catch(err => console.log(err, 'error'));
    });
  });

  // Test the DELETE here
  describe('[DELETE] /api/game/destroy', () => {
    it('should destroy using params', done => {
      chai
        .request(server)
        .del(`/api/game/destroy/${gameId}`)
        .end((err, response) => {
          if (err) {
            console.log(err);
          } else {
            console.log(response.body);
            expect(response.body).to.haveOwnProperty('success');
            expect(response.body.success.endsWith('was removed from the DB')).to
              .be.ok;
            done();
          }
        });
    });
    it('should destroy using id sent in body', done => {
      chai
        .request(server)
        .del(`/api/game/destroy/1`)
        .send({ id: gameId })
        .end((err, response) => {
          if (err) {
            console.log(err);
          } else {
            console.log(response.body);
            expect(response.body).to.haveOwnProperty('success');
            expect(response.body.success.endsWith('was removed from the DB')).to
              .be.ok;
            done();
          }
        });
    });
  });

  // --- Stretch Problem ---
  // test the PUT here
  describe('[PUT] /api/game/update', () => {
    it('should update an existing game on the database', done => {
      const update = {
        id: gameId,
        title: 'Super Mario Bros. 3',
      };
      chai
        .request(server)
        .put('/api/game/update')
        .send(update)
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          } else {
            expect(response.body).to.be.an('object');
            expect(response.body.title).to.equal(update.title);
            done();
          }
        });
    });
    it('should return error if incorrect id entered', done => {
      const update = {
        id: '5ae35dee8d540fdf89bea7bd',
        title: 'Super Mario Bros. 3',
      };
      chai
        .request(server)
        .put('/api/game/update')
        .send(update)
        .end(err => {
          if (err) {
            console.log(err.response.body);
            expect(err.response.body).to.be.an('object');
            expect(err.response.body.error).to.equal(
              'Cannot find game by that id'
            );
          } else {
            console.log(response.body);
          }
          done();
        });
    });
  });
});
