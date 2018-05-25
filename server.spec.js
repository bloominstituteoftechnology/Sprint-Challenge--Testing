const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./server');
const Game = require('./games/Game');

describe('Games', () => {
  beforeAll(() => {                                                //OPENS CONNECTION TO DATABASE 
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='));
  });

  afterAll(() => {
    return mongoose                                                          //CLOSES CONNECTION TO DATABASE
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks

      const newGame = new Game({    //Creates a new game in the database 
        title: 'Battlefield 1',
        genre: 'FPS',
        releaseDate: 'Octobet 2016'
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
    return Game.remove(); //Clear the database after each test 
  });

  it('runs the tests', () => {});

  // test the POST here
  it('Should post a game', async() => {
    const game = {
      title: 'Battlefield 1',
      genre: 'FPS',
      releaseDate: 'October 2016'
    }
    const response = await request(server)
    .post('/api/games')
    .send(game)

    //test to have all properties, status code, and type
    expect(response.body).toHaveProperty('_id')
    expect(response.body).toHaveProperty('title')
    expect(response.body).toHaveProperty('genre')
    expect(response.body).toHaveProperty('releaseDate')
    expect(response.status).toEqual(201)
    expect(response.type).toEqual('application/json')
  })

  // test the GET here
  it('should get a game from db', async () => {
    const response = await request(server)
    .get('/api/games')
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body[0].title).toEqual('Battlefield 1');
  })

  // Test the DELETE here
  it('should delete a game', async() => {
    const response = await request(server)
    .delete(`/api/games/${gameId}`);
    expect(response.status).toEqual(404); // no games stored in db comment out after each in order to get 204 status.
  })
});
