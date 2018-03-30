const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');

const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

const Game = require('./models');

describe('Games', () => {
  before(done => {
    console.log('running `before` method');
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
    console.log('running `after` method');
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('we are disconnected');
    });
  });
  let firstGameId;
  let secondGameId;
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    console.log('running `beforeEach` method')
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    new Game({
      title: 'The Rest Of Us',
      genre: 'Zombie',
      releaseDate: 'June 2011',
    }).save((err, saved) => {
      if (err) {
        console.log(err);
        return done();
      }
      firstGameId = saved._id;
    });
    new Game({
      title: 'Madden NFL 2027',
      genre: 'Sports'
    }).save((err, saved) => {
      if (err) {
        console.log(err);
        return done();
      }
      secondGameId = saved._id;
      done();;
    });
  });
  afterEach(done => {
    console.log('running `afterEach` method');
    // simply remove the collections from your DB.
      Game.remove({}, err => {
        if (err) console.error(err);
      done();
      });
    });


  // test the POST here

  describe('[POST] /api/game/create', () => {
    it('should add a new game', (done) => {
        const newGame = {
            title: 'MarioKart',
            genre: 'Racing'
        };
        chai.request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
            if (err) {
                console.error(err);
                done();
            }
            expect(res.body.title).to.equal('MarioKart');
            console.log('Post res.body: ', res.body);
            expect(res.status).to.equal(200);
        });
        done();
    });
});

  // test the GET here


  describe('[GET] /api/game/get', () => {
    it('should return a list of all the toppings', (done) => {
        chai.request(server)
        .get('/api/game/get')
        .end((err, res) => {
            if (err) {
                console.error(err);
                done();
            }
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(2);
            expect(res.body[1].genre).to.equal('Sports')
        });
        done();
    });
  });

  // test the PUT here

  // --- Stretch Problem ---
  // Test the DELETE here
});
