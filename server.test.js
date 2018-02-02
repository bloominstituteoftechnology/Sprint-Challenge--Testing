const mongoose = require('mongoose');
const server = require('./server');
const Game = require('./models');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const sinon = require('sinon');

const { expect } = chai;

chai.use(chaiHTTP);

describe('Routes', () => {

  before(done => {

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/video-games');

    const db = mongoose.connection;

    db.on('error', () => {
      done(new Error('Connection Error'));
    });

    db.once('open', () => {
      // console.log('Mongoose :: Connected');
      done();
    });

  });

  after(done => {

    const db = mongoose.connection.db;

    db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });

  describe('[POST] /api/game/create', () => {

    it('should create a new game', done => {

      const testGame = {
        title: 'California Games',
        genre: 'Sports',
        date: 'June 1987',
      };

      chai
        .request(server)
        .post('/api/game/create')
        .send(testGame)
        .then((res) => {
          
          expect(res.status).to.equal(201);
          expect(res.body.title).to.equal('California Games');
          expect(res.body.genre).to.equal('Sports');

          done();

        })
        .catch((err) => {
          done(err);
        });

    });
    
  });

  describe('[GET] /api/game/get', () => {
    
    beforeEach(done => {

      Game.remove({})
        .then((res) => {

          Game.create(
            {
              title: 'California Games',
              genre: 'Sports',
              date: 'June 1987',
            },
            {
              title: 'Super Bowl',
              genre: 'Sports',
              date: 'September 2010',
            },
            {
              title: 'Bless Chicago',
              genre: 'Religious',
              date: 'January 2018',
            }
          )
          .then(() => {
            done();
          })
          .catch(error => {
            done(error);
          });

        })
        .catch(error => {
          done(error);
        });
     
    });

    it('should return list all games', done => {

      chai
        .request(server)
        .get('/api/game/get')
        .then((res) => {
          
          expect(res.status).to.equal(200);
          expect(res.body[0].title).to.equal('California Games');
          expect(res.body[0].genre).to.equal('Sports');

          done();
          
        })
        .catch((err) => {
          done(err);
        });

    });

  });

});
