const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server')
const Game = require('./models');
const chaiHTTP = require('chai-http');
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
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const game = new Game({
      title:'Mario',
      genre:'fun' 
    })
    game
      .save()
      .then(() => {
        someId= game.id
        done();
      })
      .catch(error=>{
        done(error);
      });
  });
  afterEach(done => {
    // simply remove the collections from your DB.
      Game.remove()
        .then(() => {
          done()
        })
        .catch(error =>{
          done(error);
        })
  });

  // test the POST here
  describe('[Post] /api/game/create', () => {
    it('should post correctly to database', () => {
      const newgame = new Game({
        title: 'California Games',
        date: 'June 1987',
        genre: 'Sports'
      });
      chai
        .request(server)
        .post('/api/game/create')
        .send(newgame)
        .end((err, res) => {
          if(err) return console.log(err)
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('California Games')
        })
    })
  })

  // test the GET here
  describe('[Get] /api/game/get', () => {
    it('should get correctly to database', () => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if(err) return console.log(err)
          expect(res.status).to.equal(200);
          console.log(someId);
          expect(res.body[0].title).to.equal('Mario')
          expect(res.body[0].genre).to.equal('fun')
        })
    })
  })


  // test the PUT here
  describe('[Put] /api/game/update', () => {
    it('should update correctly on database', () => {
      const updateThis = {
        title: 'Mario Games',
        id: someId
      };
      chai
        .request(server)
        .put('/api/game/update')
        .send(updateThis)
        .end((err, res) => {
          if(err) return console.log(err)
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Mario Games')
          expect(res.body.genre).to.equal('fun')
        })
    })
  })

  // --- Stretch Problem ---
  // Test the DELETE here
  describe('[Delete] /api/game/destroy/:id', () => {
    it('should delete correctly on database', () => {
      const deleteThis = {
        id: someId
      };
      chai
        .request(server)
        .delete(`/api/game/destroy/${someId}`)
        .end((err, res) => {
          if(err) return console.log(err)
          expect(res.status).to.equal(200);
          //console.log(res.body)
          expect(res.body.success).to.equal('Mario was removed from the DB')
        })
    })
  })
});
