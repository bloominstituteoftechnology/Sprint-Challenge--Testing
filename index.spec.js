const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./api/server');

const Game = require('./games/Game');

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

  let game = {
    title: "Super Mario Bros.",
    genre: "Platformer",
    releaseDate: "September, 1985"
  }
  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    Game.create(game)
    .then(() => console.log('Game was created'));
  });

  afterEach(() => {
    //   // clear the games collection.
    Game.remove()
    .then(() => console.log('Game was deleted'));
  });

  

  // test the POST here

it('should return a status 201 code and a JSON object', async () => {
  const newGame = {
    title: "The Legend of Zelda: A Link to the Past",
    genre: "Action/Adventure",
    releaseDate: "November, 1991"
  }

  const response = await request(server).post('/api/games').send(newGame);

  expect(response.status).toEqual(201);
  expect(response.type).toEqual('application/json');
  expect(response.body.title).toBe("The Legend of Zelda: A Link to the Past")
  expect(response.body).toHaveProperty("_id");
})

  // test the GET here

it('should get the games in db and return status code 200', async () => {
    const response = await request(server).get('/api/games');
    // console.log(response.body[0].title);
    expect(response.status).toBe(200);
    expect(response.body[0].title).toEqual("Super Mario Bros.");
    expect(response.body).toHaveLength(1);
  });

  // Test the DELETE here

it('should delete game and return status code 204', async () => {
   game = {
    title: "The Legend of Zelda: A Link to the Past",
    genre: "Action/Adventure",
    releaseDate: "November, 1991"
  }

  const newGame = await Game.create(game);
  const response = await request(server).delete(`/api/games/${newGame._id}`);

  expect(response.status).toBe(204);
  expect(response.type).toBe('')
})

//Test the PUT here

it('should edit a game and return status code 200', async () => {
  game = {
    title: "Super Contra",
    genre: "Run and Gun",
    releaseDate: "January, 1988"
  };

  let newGame = await Game.create(game);

  let updatedGame = {
    id: newGame._id,
    title: "Street Fighter II",
    genre: "Fighter",
    releaseDate: "1991"
  }

  const response = await request(server).put(`/api/games/${newGame._id}`).send(updatedGame);

  // expect(response.status).toEqual(200);
  expect(response.type).toEqual('application/json');
  expect(response.body.title).toEqual("Street Fighter II");
  expect(response.body.genre).toEqual("Fighter");
  expect(response.body.releaseDate).toEqual("1991");
  expect(response.body).toHaveProperty("_id")
})

});
