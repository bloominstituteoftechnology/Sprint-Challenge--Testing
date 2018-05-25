const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./server');
const Game = require('./games/Game');

describe('Games', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='));
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
      // write a beforeEach hook that will populate your test DB with data
      // each time this hook runs, you should save a document to your db
      // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({
      title: 'SuperGame',
      genre: 'Super',
      releaseDate: 'Today'
    })

    newGame.save((err, savedGame)=>{
    if(err){
      console.log(err)
    }else{
      gameId = savedGame._id
      console.log(gameId)
    }
    })
  });

  afterEach(() => {
    return Game.remove();
  });

  it('runs the tests', () => {});

  // test the POST here

  it('adds game to database', async() => {
      const game = {
        title: 'SuperGame',
        genre: 'Super',
        releaseDate: 'Today'
      }
      const response = await request(server)
      .post('/api/games')
      .send(game)
  
      expect(response.body).toHaveProperty('_id')
      expect(response.body).toHaveProperty('title')
      expect(response.body).toHaveProperty('genre')
      expect(response.body).toHaveProperty('releaseDate')
      expect(response.status).toEqual(201)
      expect(response.type).toEqual('application/json')
    })

  // test the GET here

  it('gets game from database', async () => {
      const response = await request(server)
      .get('/api/games')
      expect(response.status).toEqual(200)
      expect(response.body[0].title).toEqual('SuperGame');
      expect(response.body[0].genre).toEqual('Super');
      expect(response.body[0].releaseDate).toEqual('Today');
      expect(response.type).toEqual('application/json');
  })
  
      // Test the DELETE here
  it('deletes game from database', async() => {
      const response = await request(server)
      .delete(`/api/games/${gameId}`);
      expect(response.status).toEqual(404);
    })
});
