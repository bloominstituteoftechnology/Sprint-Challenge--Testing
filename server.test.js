const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const chaiHTTP = require('chai-http');
const sinon = require('sinon');

chai.use(chaiHTTP);

const server = require('./server');
const Game = require('./models');

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
  let id;
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    const newGame = new Game({
      title: "Need For Speed",
      genre: "arcade",
      releaseDate: "90s something"
    });
    
    newGame.save()
      .then(savedGame => {
        gameId = savedGame._id.toString();
        console.log('>>>>>:', savedGame);
        id = 1;
      })
      .catch(err => {
        console.log(err);
      });
      done();
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
  });
  
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  // test the POST here
  describe(`[POST] /api/game/create`, () => {
    it('should save a document to the database', done => {
      chai
        .request(server)
        .post('/api/game/create')
        .send({ title: 'Counter-Strike',
                genre: 'battle',
                releaseDate: '2000s'
        })
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          console.log('response: ', response.body);
          expect(response.status).to.equal(200);
          expect(response.body).to.be.a('object');
          done();
        });
    });
    
    it(`Should fail if name or genre aren't provided`, done => {
      chai
        .request(server)
        .post('/api/game/create')
        .send({ notTitle: 'broken' })
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          const genreMessage = res.body.errors.genre.message;
          const nameMessage = res.body.errors.name.message;
          expect(res.status).to.equal(422);
          expect(genreMessage).to.equal('`genre` is required.');
          expect(nameMessage).to.equal('`name` is required.');
          done();
        });
        
    });
  });

  // test the GET here
  describe(`[GET] /api/game/get`, () => {
    it('should get a list of all the games in db', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          // console.log(response.body);
          const { _id, title, genre } = response.body[0];
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('array');
          expect(_id).to.equal(gameId);
          expect(title).to.equal('Need For Speed');
          done();
        })
        
    });
    it.skip('Should fail if bad URL is provided', () => {});
  });
  
  // Test the DELETE here
  
  describe(`[DELETE] /api/game/destroy/:id`, () => {
    it('should delete selected game from database', done => {
      
      chai
        .request(server)
        .del(`/api/game/destroy/${id}`)
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(response.status).to.equal(200);
          done();
        });
    });
  });
  
  // --- Stretch Problem ---
  // test the PUT here
});
