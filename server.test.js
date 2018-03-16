const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaihttp = require('chai-http');

const server = require('./server');
const Game = require('./models');

chai.use(chaihttp);


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

    Game.create(
      {
        title: 'Contest of Champions',
        genre: 'Fighting',
        date: 'August 18 2007',
      },
      {
        title: 'Madden 2018',
        genre: 'Sports',
        date: 'February 20, 2018',
      },
      {
        title: 'Grand Theft Auto',
        genre: 'RPG',
        date: 'September 29 1999',
      })
      .then(res => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  afterEach(done => {

    Game.remove({}).then(res => {
      done();
    })
      .catch(err => {
        done(err);
      });
  });

  describe('[POST] /api/games/create', () => {
    it('should create a game', done => {
      const addGame = {
        title: 'Angry Birds',
        genre: 'Strategy',
        date: 'May 16 2002',
      };

      chai.request(server)
        .post('/api/game/create')
        .send(addGame)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Angry Birds');
          expect(res.body.genre).to.equal('Strategy');
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe('[GET] /api/game/get', () => {
    it('should get games', done => {
      chai.request(server)
        .get('/api/game/get')
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body[0].title).to.equal('Contest of Champions');
          expect(res.body[0].genre).to.equal('Fighting');
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe('[PUT] /api/game/update', () => {
    it('should find and update any game details', done => {
      Game.find({ title: 'Contest of Champions' })
        .then(details => {
          const updatedGame = {
            id: details[0].id,
            title: 'Marvel\'s Contest of Champions',
          };
          chai.request(server)
            .put('/api/game/update')
            .send(updatedGame)
            .then(res => {
              expect(res.status).to.equal(200);
              expect(res.body.title).to.equal('Marvel\'s Contest of Champions');
              done();
            })
            .catch(err => {
              done(err);
            });
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe('[DELETE] /api/game/destroy/:id', () => {

    let gameId = null;

    it('should returned the removed game', done => {

      Game.findOne()
        .then(delData => {
          gameId = delData.id;
          chai
            .request(server)
            .delete(`/api/game/destroy/${gameId}`)
            .then((res) => {
              expect(res.status).to.equal(200);
              expect(res.body.success).to.equal(`${delData.title} was successfully removed from the database`);
              done();
            })
            .catch((err) => {
              done(err);
            });
        })
        .catch(err => {
          done(err);
        })
    });

    it('verify the game is deleted', done => {
      Game.findById(gameId)
        .then(gameData => {
          expect(gameData).to.be.null;
          done();
        })
        .catch(error => {
          done(error);
        })
    });
  });
});
