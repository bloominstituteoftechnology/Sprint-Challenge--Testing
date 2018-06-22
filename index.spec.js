const mongoose = require('mongoose');

const Game = require('./games/Game');
const server = require('./api/server')
const request = require('supertest')

describe('The API Server', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  }); 

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    await Game.create({
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987'
    })
  });

  afterEach(async () => {
    //   // clear the games collection.
    await Game.remove()
  });

  it('runs the tests', () => {});

  // test the POST here
    it('should should create a new game', async  () => {
      const texasGame = {
        title: 'Texas Games',
        genre: 'Drinking',
        releaseDate: 'May 1887'
      }
      const response = await request(server)
        .post('/api/games')
        .send(texasGame);
      
      const { status, body } = response;
      const { title } = body;
      const _gameId = '_id' in body;
      
      expect(status).toEqual(201)
      expect(title).toEqual(texasGame.title)
      expect(_gameId).toBeTruthy()
    })

  // test the GET here
    it('should return all games', async () => {
      const response = await request(server)
        .get('/api/games');

      const {status, type, body } = response;
      const _gameId = '_id' in body[0];
      
      
      expect(status).toEqual(200);
      expect(type).toEqual('application/json');
      expect(_gameId).toBeTruthy();
    })

  // Test the DELETE here

  it('should delete', async () => {
    const findGame = await Game.find({title: 'California Games'})
    const { _id } = findGame[0];
    

    const response = await request(server)
      .delete(`/api/games/${_id}`);
    const findGameAfter = await Game.find({title: 'California Games'})
    // console.log(findGameAfter)
    const {status} = response;
    // console.log(status)
    expect(status).toEqual(204)
    expect(findGameAfter.length).toBeFalsy()
  })


  // Test Put
  it('should return a status of 200 and make changes to game', async () => {
    const findGame = await Game.findOne({title: 'California Games'})
    const { _id } = findGame;
    const newTitle = {title: 'New California'}
    

    const response = await request(server)
      .put(`/api/games/${_id}`)
      .send(newTitle)
    const { status, body } = response;
    const { title } = body;
    // console.log(title)
    expect(status).toEqual(200);
    expect(title).toEqual(newTitle.title)

  })

  it('should return status 422 if title is not in params', async () => {
    const findGame = await Game.findOne({title: 'California Games'})
    const { _id } = findGame;
    const newGenre = {genre: 'New California'}
    

    const response = await request(server)
      .put(`/api/games/${_id}`)
      .send(newGenre)

    const { status, body } = response;
    
    expect(status).toEqual(422)
  })
});
