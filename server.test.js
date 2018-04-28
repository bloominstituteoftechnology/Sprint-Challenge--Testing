const mongoose = require('mongoose')
const chai = require('chai')
const chaiHTTP = require('chai-http')
const { expect } = chai

const server = require('./server')
const Game = require('./models')

chai.use(chaiHTTP)

describe('Games', () => {
  before(done => {
    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost/test')
    const db = mongoose.connection
    db.on('error', () => console.error.bind(console, 'connection error'))
    db.once('open', () => {
      console.log('we are connected')
      done()
    })
  })

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done)
      console.log('we are disconnected')
    })
  })

  let gameId
  let gameTitle
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987'
    })
    newGame.save((err, savedGame) => {
      if (err) {
        console.log(err)
        done()
      }
      gameId = savedGame._id.toString()
      gameTitle = savedGame.title
      console.log('****GAME TITLE', gameTitle)
      done()
    })
  })

  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.log(err)
      gameId = null
      done()
    })
  })

  // test the POST here
  describe(`[POST] /api/game/create`, () => {
    it('should save a game to the db', done => {
      chai
        .request(server)
        .post('/api/game/create')
        .send({ title: 'Contra', genre: 'Action', releaseDate: '1987' })
        .end((err, res) => {
          if (err) {
            done()
          }
          expect(res.body).to.be.an('object')
          done()
        })
    })
  })
  // test the GET here
  describe(`[GET] /api/game/get`, () => {
    it('should get status 200', done => {
      chai.request(server).get('/api/game/get').end((err, res) => {
        if (err) {
          console.log(err)
          done()
        }
        console.log(res.body)
        expect(res).to.be.status(200)
        done()
      })
    })
  })
  // Test the DELETE here
  describe(`[DELETE] /api/game/destroy/:id`, () => {
    it(`should delete game with given id`, done => {
      chai
        .request(server)
        .delete(`/api/game/destroy/${gameId}`)
        .end((err, res) => {
          if (err) {
            console.log(err)
            done()
          }
          expect(res.body.success).to.be.equal(
            `${gameTitle} was removed from the DB`
          )
          done()
        })
    })
  })
})
