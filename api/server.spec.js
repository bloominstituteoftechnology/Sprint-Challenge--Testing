const mongoose = require('mongoose');
const server = require('./server');
const Game = require('../games/Game');
const request = require('supertest');

const mockData = [
  {
    title: 'Super Game',
    genre: 'The engagest',
    releaseDate: 'Just now',
  },
  {
    title: 'Super Game 2',
    genre: 'The engagest',
    releaseDate: 'Just tomorrow',
  },
  {
    title: 'Super Game 3',
    genre: 'The engagest',
    releaseDate: 'Just after tomorrow',
  },
];

describe('The API Server', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(async () => {
        console.log('\n=== connected to TEST DB ===');
        await Game.insertMany(mockData)
          .then(games => {
            // console.log('GAMES CREATED: ', games);
            Game.find({})
              .then(respoonse => {
                console.log('======== MOCK DATA CREATED ========');
              })
              .catch(e => {
                console.log('ERROR ADDING MOCK DATA TO DATABASE');
              });
          })
          .catch(e => {
            console.log('error', e);
          });
      })
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  });

  afterAll(async () => {
    await Game.deleteMany({ genre: 'The engagest' })
      .then(deleteAll => {
        console.log('deleteAll MOCK DATA', deleteAll);
      })
      .catch(e => {
        console.log('error', e);
      });
    await Game.deleteMany({ releaseDate: 'After tee time' })
      .then(deleteAll => {
        console.log('deleteAll POST DATA', deleteAll);
      })
      .catch(e => {
        console.log('error', e);
      });
    return mongoose.disconnect().then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
  });

  afterEach(() => {
    //   // clear the games collection.
  });

  // test the GET here
  it('GET', async () => {
    const response = await request(server).get('/api/games');
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // test the POST here
  test('POST with valid data', async () => {
    const newGame = {
      title: 'Awesome Game',
      genre: 'Awesomes!',
      releaseDate: 'After tee time',
    };
    const res = await request(server)
      .post('/api/games')
      .send(newGame);

    expect(res.body._id).toHaveLength(24);
    expect(res.status).toEqual(201);
  });

  test('POST with no valid data', async () => {
    // Here is missing a 'required' field for Game.model -> The missing field is: 'genre'
    const newBadDAta = {
      title: 'Awesome Game',
      releaseDate: 'After tee time',
    };

    const res = await request(server)
      .post('/api/games')
      .send(newBadDAta);

    expect(res.body.error._message).toEqual('Game validation failed');
    expect(res.status).toEqual(500);
  });

  // Test the DELETE here
  test('DELETE passing a Id that is in the database', async () => {
    const { id } = await Game.findOne({ title: 'Super Game 3' }, { _id: 1 });
    console.log('DELETE ID', id);
    const res = await request(server).delete(`/api/games/${id}`);
    expect(res.body).toEqual({});
    expect(res.status).toEqual(204);
  });
  test('DELETE passing a Id that is NOT in the database', async () => {
    const id = 'A_NOT_VALID_ID';
    const res = await request(server).delete(`/api/games/${id}`);
    expect(res.body.name).toEqual('CastError');
    expect(res.status).toEqual(500);
  });

  // Test the PUT here
  test('PUT with missing require params', async () => {
    const { id } = await Game.findOne({ title: 'Super Game 2' }, { _id: 1 });
    const dataToUpdte = {
      genre: 'THIS WAS UPDATED',
    };

    const res = await request(server)
      .put(`/api/games/${id}`)
      .send(dataToUpdte);

    expect(res.status).toEqual(422);
    expect(res.body.error).toEqual('Must Provide a title && Id');
  });
  test('PUT with require params', async () => {
    const { id } = await Game.findOne({ title: 'Super Game 2' }, { _id: 1 });
    const dataToUpdte = {
      title: 'TITLE WAS UPDATED',
    };

    const res = await request(server)
      .put(`/api/games/${id}`)
      .send(dataToUpdte);

    expect(res.status).toEqual(200);
    expect(res.body.title).toEqual('TITLE WAS UPDATED');
  });
});
