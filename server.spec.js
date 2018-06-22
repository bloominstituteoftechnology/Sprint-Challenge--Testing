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
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({    //Creates a new game in the database 
      title: 'Resident Evil II',
      genre: 'Survivol Horror',
      releaseDate: 'January 1998'
    })
    newGame.save((err, savedGame) => {
      if (err) {
        console.log(err)
      } else {
        gameId = savedGame._id
      }
    })
  });

  afterEach(() => {
    return Game.remove()
  });

  it('runs the tests', () => {});

  // test the POST here
  it('should post a game', async () => {
    const game = {
      title: 'FIFA 2018',
      genre: 'Sports',
      releaseDate: 'October 2018'
    }
    const response = await request(server)
      .post('/api/games')
      .send(game)

    expect(response.body).toHaveProperty('_id')
    expect(response.body.title).toEqual('FIFA 2018')
    expect(response.body.genre).toEqual('Sports')
    expect(response.body.releaseDate).toEqual('October 2018')
    expect(response.status).toEqual(201)
    expect(response.type).toEqual('application/json')
  })
  // test the GET 
  
  it('should get a game from db', async () => {
    const response = await request(server)
    .get('/api/games')
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body[0].title).toEqual('Resident Evil II');
  })

  // Test the DELETE here
 
  it("should throw an error if no game is found", async () => {
    const response = await request(server).delete(
      `/api/games/9b082076bae0473cc86a5d92`
    );
    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual("Game not found");
  });
  
  it("should throw error if the id is not valid", async () => {
    const response = await request(server).delete(`/api/games/invalidId`);
    expect(response.status).toEqual(500);
  });
});
