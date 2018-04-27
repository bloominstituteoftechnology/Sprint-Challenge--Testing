const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaiHTTP = require('chai-http');
const server = require('./server');

const Game = require('./models');
chai.use(chaiHTTP);

describe('Games', () => {
  before((done) => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('we are connected');
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('we are disconnected');
    });
    done();
  });
  let gameId;
  // hint - these wont be constants because you'll need to override them.
  beforeEach((done) => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({
      title: 'Uncharted',
      genre: 'Adventure',
      releaseDate: '2007 to 2017',
    });
    newGame
      .save()
      .then((savedGame) => {
        gameId = savedGame._id.toString();
      })
      .catch((err) => {
        console.log(err);
      });
    done();
  });
  afterEach((done) => {
    // simply remove the collections from your DB.
    Game.remove({}, (err) => {
      if (err) console.log(err);
      return done();
    });
  });

  // test the POST here
  describe(`[POST] /api/game/create`, () => {
    it('should save a game the db', (done) => {
      chai
        .request(server)
        .post('/api/game/create')
        .send({
          title: 'Little Big Planet 3',
          genre: 'Adventure',
          releaseDate: 'November 18, 2014',
        })
        .then((response) => {
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
    it(`Should fail title or genre or release date aren't provided`, () => {
      return chai
        .request(server)
        .post('/api/game/create')
        .send({ bad: 'data' })
        .then((res) => {
          const genreMessage = res.body.errors.genre.message;
          const titleMessage = res.body.errors.title.message;
          const releaseDateMessage = res.body.errors.releaseDate.message;
          expect(res.status).to.equal(422);
          expect(genreMessage).to.equal('Path `genre` is required.');
          expect(titleMessage).to.equal('Path `title` is required.');
          expect(releaseDateMessage).to.equal('Path `releaseDate` is required.');
        });
    });
  });

  // test the GET here
  describe(`[GET] /api/game/get`, () => {
    it('should get a list of all the games in db', (done) => {
      chai
        .request(server)
        .get('/api/game/get')
        .then((response) => {
          const { _id, title, genre } = response.body[0];
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('array');
          expect(_id).to.equal(gameId);
          expect(title).to.equal('Uncharted');
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
    it.skip('Should fail if bad URL is provided', () => {});
  });

  // Test the DELETE here
  // describe(`[DELETE] api/game/destroy/:id`, () => {
  //   it('should delete a game in db', (done) => {
  //     chai
  //       .request(server)
  //       .delete(`/api/game/destroy/:${gameId}`)
  //       .end((response) => {
  //         expect(response.text).to.equal('success');
  //       })
  //       .catch((err) => {
  //         throw err;
  //       });
  //   });
  //   it.skip('Should fail if bad URL is provided', () => {});
  // });

  describe('[DELETE] /api/game/destroy/:id', () => {
    it('should remove a game from the database', (done) => {
      const game = new Game({
        title: 'Uncharted',
        genre: 'Adventure',
        releaseDate: '2007 to 2017',
      });
      game.save((err, savedGame) => {
        chai
          .request(server)
          .delete('/api/game/destroy/' + game._id)
          .end((err, response) => {
            if (err) {
              console.log(err);
              done();
            }
            expect(response.status).to.equal(200);
            expect(response.body).to.be.a('object');
            done();
          });
      });
    });
  });

  // --- Stretch Problem ---
  // test the PUT here
});
