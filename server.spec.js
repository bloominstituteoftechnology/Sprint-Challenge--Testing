const mongoose = require('mongoose');
const request = require("supertest");
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
    const game = new Game({
            title: "Overwatch",
            genre: "FPS",
            releaseDate: "2016"
          });
      
         game.save((err, savedGame) => {
           if (err) {
             console.log(err);
           } else {
             gameId = savedGame._id;
           }
           done();
         })
  });

  afterEach(() => {
    //   // clear collection.
    return Game.remove()
  });

  it('runs the tests', () => {});

  // test the POST here
  it("should post a new game", async() => {
    const game = {
      title: "Destiny",
      genre: "FPS",
      releaseDate: "2015"
    };
    const response = await request(server).post('/api/games').send(game)
    expect(response.status).toEqual(201);
    expect(respone.body).toHaveProperty("title");
    expect(response.body.releaseDate).toEqual("2015")
  })

  // test the GET here
  it('should get the games', async() => {
    const response = await request(server).get('/api/games');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toHaveLength(1)
})

  // Test the DELETE here
  it("should delete a game", async() => {
    const response = await request(server).get('/api/games');
    gameId = response.body[0]._id;
    const responseDel = await request(server).delete(`/api/games/${gameId}`);
    expect(responseDel.body).toEqual({});
    expect(responseDel.status).toEqual(204);
});
});
