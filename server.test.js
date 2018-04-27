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
  let gameId;
  // hint - these wont be constants because you'll need to override them.
  beforeEach(() => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({
      title: 'Test Games',
      genre: 'Test',
      releaseDate: 'June 1975'
    });
    return newGame
      .save()
      .then(savedGame => {
        gameId = savedGame._id.toString();
      })
      .catch(err => {
        console.log(err);
      });
  });

  afterEach(() => {
    // simply remove the collections from your DB.
    return Game.remove({}, err => {
      if (err) console.log(err);
    });
  });

  // test the POST here
  describe(`[POST] /api/game/create`, () => {
    it('should save a game to the db', () => {
      return chai
        .request(server)
        .post('/api/game/create')
        .send({
          title: 'California Games',
          genre: 'Sports',
          releaseDate: 'June 1987'
        })
        .then(response => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          console.log('Game added!');
        })
        .catch(err => {
          throw err;
        });
    });
  });

  // test the GET here
  describe(`[GET] /api/game/get`, () => {
    it('should get the games', () => {
      return chai
        .request(server)
        .get('/api/game/get')
        .then(response => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('array');
          expect(response.body[0].title).to.equal('Test Games');
          console.log('Games retrieved!');
        })
        .catch(err => {
          throw err;
        });
    });
  });

  // Test the DELETE here
  describe(`[DELETE] /api/game/destroy/:id`, done => {
    it('should delete the test game', () => {
      return chai
        .request(server)
        .get('/api/game/get')
        .then(response => {
          //console.log(response.body);
          return chai
            .request(server)
            .del('/api/game/destroy/' + response.body[0]._id)
            .then(response => {
              expect(response.status).to.equal(200);
              expect(response.body).to.be.an('object');
              expect(response.body.title).to.equal(undefined);
            })
            .catch(err => {
              throw err;
            });
        })
        .catch(err => {
          throw err;
        });
    });
  });

  //--- Stretch Problem ---
  //test the PUT here
  describe(`[PUT] /api/game/update/:id`, () => {
    it('should update the test game', () => {
      return chai
        .request(server)
        .get('/api/game/get')
        .then(response => {
          console.log(response.body);
          return chai
            .request(server)
            .put('/api/game/update/' + response.body[0]._id)
            .send({
              title: 'Updated Put Games',
              genre: 'Put',
              releaseDate: 'June 2018'
            })
            .then(response => {
              expect(response.status).to.equal(200);
            })
            .catch(err => {
              throw err;
            });
        })
        .catch(err => {
          throw err;
        });
    });
  });
});
