const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const Game = require('./models');
const server = require('./server');

chai.use(chaihttp);

describe('Games', () => {
  before(done => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('\n*~*~*~*~*~*~*~*~*~ we are connected ~*~*~*~*~*~*~*~*~*\n');
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('\n*~*~*~*~*~*~*~*~ we are disconnected *~*~*~*~*~*~*~*~*\n');
    });
  });
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  const games = [
    {
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987',
    },
    {
      title: 'Washington Games',
      genre: 'Recreational',
    },
    {
      title: 'Vancouver Games',
      genre: 'Chill',
      releaseDate: 'March 2018',
    },
    {
      title: 'Oregon Games',
      genre: 'Recreational',
      releaseDate: 'July 2017',
    },
    {
      title: 'Texas Games',
      genre: 'Cattle',
      releaseDate: 'December 2016',
    },
  ];

  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks

    Game.remove(_ => {
      Promise.all([games.map(game => Game(game).save())]).then(_ => done());
    });
  });

  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove(_ => done());
  });

  // test the POST here
  describe(`[POST] /api/game/create`, _ => {
    it('should return a status code of 200 when a game is saved', done => {
      const game = {
        title: 'Lambda Games',
        genre: 'Computer Science',
        releaseDate: 'July 2017',
      };

      chai
        .request(server)
        .post('/api/game/create')
        .send(game)
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
    });

    it('should return the saved game', done => {
      const game = {
        title: 'Lambda School Games',
        genre: 'Computer Science Academy',
        releaseDate: 'January 2018',
      };

      chai
        .request(server)
        .post('/api/game/create')
        .send(game)
        .end((err, res) => {
          expect(res.body.title).to.equal(game.title);
          expect(res.body.genre).to.equal(game.genre);
          expect(res.body.releaseDate).to.equal(game.releaseDate);
          expect(res.body.__v).to.not.equal(null);
          expect(res.body._id).to.not.equal(null);

          done();
        });
    });

    it('should return a status code of 422 when no title is supplied', done => {
      const game = {
        genre: 'Computer Science Academy',
        releaseDate: 'January 2018',
      };

      chai
        .request(server)
        .post('/api/game/create')
        .send(game)
        .end((err, res) => {
          expect(res).to.have.status(422);

          done();
        });
    });

    it('should return some kind of error message when no title is supplied', done => {
      const game = {
        genre: 'Computer Science Academy',
        releaseDate: 'January 2018',
      };

      chai
        .request(server)
        .post('/api/game/create')
        .send(game)
        .end((err, res) => {
          expect(res.body.error).to.not.equal(null);

          done();
        });
    });

    it('should return a status code of 422 when no genre is supplied', done => {
      const game = {
        title: 'Lambda School Games',
        releaseDate: 'January 2018',
      };

      chai
        .request(server)
        .post('/api/game/create')
        .send(game)
        .end((err, res) => {
          expect(res).to.have.status(422);

          done();
        });
    });

    it('should return some kind of error message when no genre is supplied', done => {
      const game = {
        title: 'Lambda School Games',
        releaseDate: 'January 2018',
      };

      chai
        .request(server)
        .post('/api/game/create')
        .send(game)
        .end((err, res) => {
          expect(res).to.have.status(422);

          done();
        });
    });

    it('should return a status code of 200 when no releaseDate is supplied', done => {
      const game = {
        title: 'Lambda School Games',
        genre: 'Computer Science Academy',
      };

      chai
        .request(server)
        .post('/api/game/create')
        .send(game)
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
    });

    it('should return the saved game when no releaseDate is supplied', done => {
      const game = {
        title: 'Lambda School Games',
        genre: 'Computer Science Academy',
      };

      chai
        .request(server)
        .post('/api/game/create')
        .send(game)
        .end((err, res) => {
          expect(res.body.title).to.equal(game.title);
          expect(res.body.genre).to.equal(game.genre);
          expect(res.body.__v).to.not.equal(null);
          expect(res.body._id).to.not.equal(null);

          done();
        });
    });
  });

  // test the GET here

  // test the PUT here

  // --- Stretch Problem ---
  // Test the DELETE here
});
