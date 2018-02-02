const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

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
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
describe('Games', () => {
   beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
          Game.remove({}, (err) => { 
             done();         
          });     
      });
  /*
    * Test the /GET route
    */
   
   
    });
  });
  afterEach(done => {
    // simply remove the collections from your DB.
  });
  // test the POST here
describe('/POST /api/game/create', () => {
  it('it should not POST a game without genre', (done) => {
    let game = {
        title: "Final Fantasy",
        //genre: "RPG",
        releaseDate: "in the 1900's"
    }
    chai.request(server)
    .post('/api/game/create')
    .send(game)
    .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('genre');
        res.body.errors.genre.should.have.property('kind').eql('required');
      done();
    });
    it('it should POST a game ', (done) => {
      let game = {
          title: "Final Fantasy",
          genre: "RPG",
          releaseDate: "in the 1900's"  
      }
      chai.request(server)
          .post('/api/game/create')
          .send(game)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('game successfully added!');
              res.body.game.should.have.property('title');
              res.body.game.should.have.property('genre');
              res.body.game.should.have.property('releaseDate');             
            done();
          });
    });
 });
});
  // test the GET here
describe('/GET /api/game/game', () => {
  it('it should GET all the games', (done) => {
    chai.request(server)
        .get('/api/game/get')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
          done();
        });
    });
});
   
 

  // test the PUT here
describe('/PUT/:id /api/game/update', () => {
  it('it should UPDATE a game given the id', (done) => {
    let game = new Game({title: "Final Fantasy", genre: "RPG", releaseDate: "19xx"})
    game.save((err, game) => {
            chai.request(server)
            .put('/game/' + game.id)
            .send({title: "Final Fantasy", genre: "RPG", releaseDate: "in the 1900's"})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('game updated!');
                res.body.game.should.have.property('year').eql(1950);
              done();
            });
        });
    });
});


  // --- Stretch Problem ---
  // Test the DELETE here
describe('/DELETE/:id /api/game/destroy/:id', () => {
  it('it should DELETE a game given the id', (done) => {
    let game = new Game({title: "Final Fantasy", genre: "RPG", releaseDate: "in the 1900's"})
    game.save((err, game) => {
            chai.request(server)
            .delete('/api/game/destroy/' + game.id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Game successfully deleted!');
                res.body.result.should.have.property('ok').eql(1);
                res.body.result.should.have.property('n').eql(1);
              done();
              });
        });
    });
});

