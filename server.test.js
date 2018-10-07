const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server');

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
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  let id = '';
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    new Game({
        title: 'California Games',
        genre: 'Sports',
        releaseDate: 'June 1987'
      }).save((err, game) => {
        if (err) {
          console.log(err);
          done();
        }
        id = game._id;
        done();
      });
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, (err) => {
      if(err) console.log(err);
      done();
    });
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it('should add a new game', (done) => {
      const newGame = {
        title: 'Nier Automata',
        genre: 'Action RPG',
        releaseDate: 'Feb 2017'
      };
      chai.request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
          if(err) console.error(err);

          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Nier Automata');
          done();
        });
    });
    it('should return an error when missing info', (done) => {
      const newGame = {
        genre: 'not a real one',
        releaseDate: 'Feb 2014'
      };
      chai.request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
          if(err) console.error(err);

          expect(res.status).to.equal(422);
          done();
        });
    });
  });

  // test the GET here
  describe('[GET] /api/game/get', () => {
    it('should return all games', (done) => {
      chai.request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if(err) console.error(err);

          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body[0].title).to.equal('California Games');
          done();
        });
    });
  });

  // test the PUT here

  describe('[PUT] /api/game/update', () => {
    it('should update the Game', (done) => {
      let update = {
        title: 'California Games II',
        genre: 'Sports',
        releaseDate: '1993',
        id: id,
      };

      chai.request(server)
        .put('/api/game/update/')
        .send(update)
        .end((err, res) => {
          if(err) console.error(err);

          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('California Games II');

          chai.request(server)
            .get('/api/game/get')
            .end((err, res) => {
              if(err) console.error(err);

              expect(res.status).to.equal(200);
              expect(res.body[0].title).to.equal('California Games II');
              done();
            });
        });

    })
  });

  // --- Stretch Problem ---
  // Test the DELETE here
  describe('[DELETE] /api/game/destroy/', () => {
    it('should delete game with the id in the URL', (done) => {
      chai.request(server)
        .delete(`/api/game/destroy/${id}`)
        .end((err, res) => {
          if(err) console.error(err);

          expect(res.status).to.equal(200);
          Game.findById(id, (err, deletedGame) => {
            if(err) console.error(err);

            expect(deletedGame).to.equal(null);
            done();
          });
        });
    });

    it('should delete game with the id in the body', (done) => {
      let request = {
        id: id,
      }
      chai.request(server)
        .delete('/api/game/destroy/1')
        .send(request)
        .end((err, res) => {
          if(err) console.error(err);

          expect(res.status).to.equal(200);
          Game.findById(id, (err, deletedGame) => {
            if(err) console.error(err);

            expect(deletedGame).to.equal(null);
            done();
          });
        });
    });

    // it('should error for an id that doesnt match a game', (done) => {
    //   chai.request(server)
    //     .
    // });
  });

});
