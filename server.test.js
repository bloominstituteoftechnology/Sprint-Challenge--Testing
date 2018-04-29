const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaiHTTP = require('chai-http');

const Game = require('./models');
const server = require('./server');
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
  beforeEach(done => {

    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({
      title: 'fifa 2018',
      genre: 'soccer',
      releaseDate: '2018'

    });
    newGame.save((err, savedGame) =>{
      if(err){
        console.log(err);
        done();
      }
      GameId = savedGame._id.toString();
      done();
    })

  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  // test the POST here
  describe(` [POST]  /api/game/create`, () => {
    it('should save the game to the db', done =>{
      chai.request(server)
      .post('/api/game')
      .send({ name: 'fifa2019', genre: 'soccer', releaseDate: 'Jan 2019'})
      .then(response => {

done();
      })
      .catch(err =>{
        throw err;
      });
      it('should fail if no name or genre is provided', (done) =>{
        chai
        .request(server)
        .post('/api/game/create')
        .send({ name: 'fifa2019',  releaseDate: 'Jan 2019'})
        .then(response => {
          expect(reponse.status).to.equal(200);
          expect(response.body).to.include(name,genre,releaseDate);
          done();
        })
        .catch(err =>{
          throw err;
          done();
        });
      
    });
  });

  // test the GET here
  describe(`[GET] /api/game/get`, () =>{
    it('should display all lists of games in db', done => {
      chai
      .request(server)
      .get('/api/game/get')
      .then(response =>{
expect(response.status).to.equal(200);
expect(_id).to.equal(bandId);
        done();
      })
      .catch(err =>{
        throw err;
      })
    })
it('should fail if a bad request is made', () =>{

})
  })

  // Test the DELETE here
  describe('Delete', () => {
    it('should delete a record removing from db', done => {
      chai
        .request(server)
        .delete(`/api/game/destroy/${gameId}`)
        .end((err, response) => {
          if (err) console.log(err);
          const { success } = response.body;
          expect(response.status).to.equal(200);
          expect(success).to.be.a('string');
          expect(success).to.equal(`${gameTitle} was removed from the DB`);
          done();
        });
    });

    it('should handle a bad id', done => {
      chai
        .request(server)
        .delete(`/api/game/destroy/noop`)
        .end((err, response) => {
          if (err) {
            const { error } = err.response.body;
            expect(error).to.be.a('string');
            expect(error).to.equal('Cannot find game by that id');
            expect(err.response.clientError).to.be.ok;
            expect(err.response.status).to.equal(422);
          }
          done();
        });
    });
  });
});
});
