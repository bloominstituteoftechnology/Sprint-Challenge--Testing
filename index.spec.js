const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./api/server');

describe('The API Server', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/games')
      .then(() => console.log('\n=== connected to games DB ==='))
      .catch(err => {
        console.log('error connecting to games database, is MongoDB running?');
      });
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from games DB ==='));
  });

  let gameOneId;
  let gameTwoId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
  });

  afterEach(() => {
    //   // clear the games collection.
  });

  it('It should return a status code of 201 and return the title, genre, and release date of the game created.', async () => {

    // test the POST here

    const expectedStatusCode = 201;

    const fortnite = { title: 'Fortnite', genre: 'Survival', releaseDate: 'July 25, 2017' };
    const responseOne = await request(server).post('/api/games').send(fortnite);

    const godofwar = { title: 'God of War 4', genre: 'Action-adventure', releaseDate: 'April 20, 2018' };
    const responseTwo = await request(server).post('/api/games').send(godofwar);

    expect(responseOne.status).toEqual(expectedStatusCode);
    expect(responseOne.body.title).toEqual(fortnite.title);
    expect(responseOne.body.genre).toEqual(fortnite.genre)
    expect(responseOne.body.releaseDate).toEqual(fortnite.releaseDate)
    expect(responseOne.type).toEqual('application/json');

    expect(responseTwo.status).toEqual(expectedStatusCode);
    expect(responseTwo.body.title).toEqual(godofwar.title);
    expect(responseTwo.body.genre).toEqual(godofwar.genre);
    expect(responseTwo.body.releaseDate).toEqual(godofwar.releaseDate);
    expect(responseTwo.type).toEqual('application/json');
  });

  // test the GET here

  // Test the DELETE here
});
