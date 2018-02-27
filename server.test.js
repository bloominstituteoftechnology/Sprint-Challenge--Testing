const mongoose = require('mongoose');
const chai = require('chai');
const server = require('./server');
const { expect } = chai;
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const Game = require('./models');

chai.use(chaiHttp);

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
  
  beforeEach(done => {
    Game.create({
      title: 'California Games',
      genre: 'sports',
      date: 'June 1987'
    })
    .then(res => {
      done();
    })
    .catch(err => {
      done(err);
    });
  });

  afterEach(done => {
    Game.remove({})
      .then(res => {
        done();
      })
      .catch(err => {
        done(err);
      })
  });

  // test the POST here

  describe('[POST] /api/game/create', () => {
    it('should create a game event', (done) => {
      const game = {
        title: 'California Games',
        genre: 'sports',
        date: 'June 1987'
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(game)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('California Games');
          done();
        }).catch((err) => done(err));
    });
    it('should return 400 for invalid input', () => {
      chai
        .request(server)
        .post('/api/game/create')
        .send({})
        .then((res) => {
          return done(new Error('should have failed with 400'));
        }).catch((err) => {
          expect(err.status).to.equal(400);
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
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body[0].title).to.equal('California Games');
          done();
        }).catch((err) => done(err));
    });
  });

  // test the PUT here

  describe('[PUT] /api/game/update', () => {
    it('should update a particular game', () => {
      Game.find({
        title: 'California Games'
      })
      .then((data) => {
        const game = {
          id: data[0].id,
          title: 'Hawaii Games'
        };
        chai
          .request(server)
          .put('api/game/update')
          .send(game)
          .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Hawaii Games');
          done();
        }).catch((err) => done(err));
      });
    });
  });

  // --- Stretch Problem ---
  // Test the DELETE here
});
