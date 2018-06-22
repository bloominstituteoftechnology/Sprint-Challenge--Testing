const mongoose = require('mongoose');

const Game = require('./games/Game');

const request = require('supertest');
const server = require('./api/server');

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
    const expectedBody = {
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987'
    }
    const game = await Game.create(expectedBody)
  });

  afterEach( async () => {
    //   // clear the games collection.
      await Game.remove();
  });

  it('runs the tests and returns an OK status code and a JSON object from the index route', async () => {
    const expectedStatusCode = 200;
    const expectedBody = { api: 'running!' };

    const response = await request(server).get('/');

    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body).toEqual(expectedBody);
    expect(response.type).toEqual('application/json');
  });


  // test the POST here
  it('returns a 201 status code and a JSON object from the /api/games route', async () => {
    const expectedBody = {
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987'
    }

    const response = await request(server).post('/api/games').send(expectedBody)

    expect(response.status).toEqual(201);
    expect(response.type).toEqual("application/json");
    expect(response.body.title).toEqual(expectedBody.title);
    expect(response.body.genre).toEqual(expectedBody.genre);
    expect(response.body.releaseDate).toEqual(expectedBody.releaseDate);
  })

  it('should return status 500 if title (required by schema) is missing', async () => {
    const expectedBodyMissingTitle = {
      genre: 'Sports',
      releaseDate: 'June 1987'
    }

    const response = await request(server).post('/api/games').send(expectedBodyMissingTitle);

    expect(response.status).toEqual(500);
    expect(response.body.error.message).toEqual( "Game validation failed: title: Path `title` is required.")
  })

  // test the GET here
  it('returns a status code 200 & a JSON array/list containing game objects', async () => {

    const response = await request(server).get('/api/games');
    const game = response.body[0];

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.type).toEqual('application/json');
    expect(typeof(game)).toBe('object');
  })
  it('should return a game object that matches the expectedBody', async () => {
    const response = await request(server).get('/api/games');
  
    const expectedBody = {
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987'
    }
    expect(response.body[0].title).toEqual(expectedBody.title)
    expect(response.body[0].genre).toEqual(expectedBody.genre)
    expect(response.body[0].releaseDate).toEqual(expectedBody.releaseDate)
  })

    // Test the DELETE here
    it('returns a status code 204 upon deleting resource', async () => {
  
      const response = await request(server).get('/api/games')
      const idToBeDeleted = response.body[0]._id;
      const responseForDelete = await request(server).delete(`/api/games/${idToBeDeleted}`);

      expect(responseForDelete.status).toEqual(204);
    })

    it('returns a 404 and an object with a message if the game does not exist in the database', async () => {
      const response = await request(server).delete('/api/games/1b2c49a076949f4651110b33'); // must provide mongoose id format otherwise test returns 500

      expect(response.status).toBe(404);
      expect(response.body).toEqual({"message": "Game not found"});
    })

    // it('should return a 422 if no id is provided', async () => {
    //   const response = await request(server).delete('/api/games');
    //   expect(response.status).toEqual(422);
    // })
  })

  



