const mongoose = require('mongoose');
const server = require('./server');
const Game = require('./models');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const sinon = require('sinon');

const { expect } = chai;

chai.use(chaiHTTP);

describe('Game: Routes', () => {
  
  before(done => {
    
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/video-games');
    
    const db = mongoose.connection;
    
    db.on('error', () => {
      done(new Error('Connection Error'));
    });
    
    db.once('open', done);
    
  });
  
  after(done => {
    
    const db = mongoose.connection.db;
    
    db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  
  });
  
  beforeEach(done => {
    
    Game.create(
      {
        title: 'California Games',
        genre: 'Sports',
        date: 'June 1987',
      },
      {
        title: 'Super Bowl',
        genre: 'Football',
        date: 'September 2010',
      },
      {
        title: 'FIFA World Cup',
        genre: 'Soccer',
        date: 'January 2018',
      }
    )
    .then(res => {
      done();
    })
    .catch(error => {
      done(error);
    });
    
  });

  afterEach(done => {

    Game.remove({})
      .then(res => {
        done();
      })
      .catch(error => {
        done(error);
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

  describe('[PUT] /api/game/update', () => {
    
    it('should update the game details', done => {

      Game.find({ title: 'FIFA World Cup' })
        .then(data => {

          const testGame = {
            id: data[0].id,
            title: 'Champions League',
          };
    
          chai
            .request(server)
            .put('/api/game/update')
            .send(testGame)
            .then((res) => {
              
              expect(res.status).to.equal(200);
              expect(res.body.title).to.equal('Champions League');
    
              done();
    
            })
            .catch((err) => {
              done(err);
            });

        })
        .catch(error => {
          done(error);
        });

    });
    
  });

  describe('[DELETE] /api/game/destroy/:id', () => {
    
    let gameId = null;

    it('should returned the removed game', done => {

      Game.findOne()
        .then(data => {
          
          gameId = data.id;
        
          chai
            .request(server)
            .delete(`/api/game/destroy/${ gameId }`)
            .then((res) => {
              
              expect(res.status).to.equal(202);
              expect(res.body.success).to.equal(`${ data.title } was removed from the DB`);
    
              done();
    
            })
            .catch((err) => {
              done(err);
            });

        })
        .catch(error => {
          done(error);
        })

    });

    it('verify the game is deleted', done => {

      Game.findById(gameId)
        .then(data => {
          
          expect(data).to.be.null;

          done();

        })
        .catch(error => {
          done(error);
        })

    });
    
  });

});
