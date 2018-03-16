const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http')
const { assert } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

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
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    let donkeyKong = new Game({
      title: 'Donkey Kong',
      genre: 'Platformer',
      releaseDate: 'July 9, 1981'
    })
    let pacMan = new Game({
      title: 'Pac-Man',
      genre: 'Maze Chase'
    })
    let contra = new Game({
      title: 'Contra',
      genre: 'Shoot \'em up'
    })
    donkeyKong.save().then(game => {
        testGame1 = donkeyKong;
        testGame1_id = donkeyKong._id.toString();
      })
      .catch(err => console.error('Error saving testGame1.'))

    pacMan.save().then(game => {
        testGame2 = pacMan;
        testGame2_id = pacMan._id.toString();
      })
      .catch(err => console.error('Error saving testGame2.'))

    contra.save().then(game => {
        testGame3 = contra;
        testGame3_id = contra._id.toString();
      })
      .catch(err => console.error('Error saving testGame3.'))
    done();
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.error('Error removing the test games')
      done();
    })
  });

  // test the POST here
  describe('[POST] /api/game/create', (done) => {
    it('should add a new game', (done) => {
      const newGame = new Game({
        title: 'Prince of Persia',
        genre: 'Platformer'
      });
      chai.request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
          assert.isObject(newGame)
          assert.equal(newGame.title, 'Prince of Persia');
          assert.property(newGame, 'genre');
          done();
        })
    })
  })

  // test the GET here
  describe('[GET] /api/game/get', (done) => {
    it('should return all the expected games', (done) => {
      chai.request(server)
        .get(`/api/game/get`)
        .end((err, res) => {
          // expect(res.status).to.equal(200);
          // console.log(res.body)
          assert.lengthOf(res.body, 3);
          assert.containsAllKeys(res.body[0], ['title', 'genre'])
        })
      done();
    })
  })
  // test the PUT here
  describe('[PUT], /api/game/update', (done) => {
    it('should update a game', (done) => {
      const testGame = {title: 'Zelda',genre: 'Platformer' }
      Game.find({}, (err, games) => {
        if (err) return;
        let firstGame = games[0];
        const updatedGame = { id: firstGame._id, title: testGame.title, genre: testGame.genre}
        chai.request(server)
          .put('/api/game/update')
          .send(updatedGame)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body._id, firstGame._id);
            done()
          })
      })
    })
  })
  // --- Stretch Problem ---
  // Test the DELETE here
  describe('[DELETE], /api/game/destroy/:id', (done) => {
    it('should delete the game with the given id', (done) => {
      Game.find({}, (err, existingGames) => {
        if (err) return;
        const idToRemove = existingGames[0]._id;
        chai.request(server)
          .delete(`/api/game/destroy/${idToRemove}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.success, `${existingGames[0].title} was removed from the DB`)
            done()
          })
      })
    })
  })
});