const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server');
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
  
  let id = null;
  let game = null;

  beforeEach(done => {
    const newGame = new Game({
      title: 'Duck Hunt',
      genre: 'light gun shooter',
      releaseDate: '21 April 1984',
    });
    newGame.save((error, saved) => {
      if (error) {
        console.error(err);
        return done();
      }
      id = saved._id;
      game = saved;
      done();
    });
  });

  afterEach(done => {
    Game.remove({}, (error, removed) => {
      if (error) {
        console.error(err);
        return done();
      }
      done();
    });
  });

  describe('[POST] /api/game/create', () => {
    it('should add a new game', (done) => {
      const postGame = new Game({
        title: 'California Games',
        genre: 'Sports',
        releaseDate: 'June 1987',
      });
      chai
        .request(server)
        .post('/api/game/create')
        .send(postGame)
        .end((err, res) => {
          if (err) {
            throw new Error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('California Games')
          done();
        });
    });
    it('should have status 422 when improper data is passed', (done) => {
      const postGame = {
        title: 'California Games 2',
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(postGame)
        .end((err, res) => {
          if (err) {
            expect(err.status).to.equal(422);
            done();
          }
        });
    });
  });

  describe(`[GET] /api/game/get`, () => {
    it('should get all games in the db', (done) => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            throw new Error(err);
            done();
          }
          expect(res.body[0].title).to.equal('Duck Hunt');
          expect(res.body[0]._id).to.equal(id.toString());
          done();
        });
    });
  });

  describe(`[PUT] /api/game/update`, () => {
    it('update a document given an id and update information', (done) => {
      const update = {
        id: id,
        title: 'Duck Hunt Changed',
      };
      chai
        .request(server)
        .put('/api/game/update')
        .send(update)
        .end((err, res) => {
          if (err) {
            throw new Error(err);
            done();
          }
          expect(res.body.title).to.equal(update.title);
          done();
        });
    });
    it('handle error', (done) => {
      const update = {
        id: '24601',
        title: 'Duck Hunt Changed',
        genre: 'Genre Changed',
        releaseDate: 'unkown',
      };
      chai
        .request(server)
        .put('/api/game/update')
        .send(update)
        .end((err, res) => {
          if (err) {
            expect(err.status).to.equal(422);
          }
          done();
        });
    });
  });
  describe('[DELETE] /api/game/destroy/:id', () => {
    it('should delete a game from the list', (done) => {
        chai.request(server)
        .delete(`/api/game/destroy/${id}`)
        .end((err, res) => {
            if (err) {
              throw new Error(err);
              done();
            }
            expect(res.status).to.equal(200);
        });
        done();
    });
    it('should delete a game from the list', (done) => {
      chai.request(server)
      .delete(`/api/game/destroy/24601`)
      .end((err, res) => {
          if (err) {
            expect(res.status).to.equal(422);
            done();
          }
      });
    });
  });
});
