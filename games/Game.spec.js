const mongoose = require('mongoose');

const Game = require('./Game');

describe('The Game Model', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  });

  afterAll(() => {
    return mongoose.disconnect().then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  describe('Test validators', () => {
    const testData = new Game({
      title: 'testing required fields',
      releaseDate: 'June 2018',
    });

    afterEach(() => {
      return Game.deleteOne({ title: testData.title })
        .then(response => {
          console.log('response', response);
        })
        .catch(e => {
          console.log('error', e);
        });
    });

    it('If required fields are no provided return an error', async () => {
      return Game.create(testData)
        .then(response => {
          expect('if we are here the test fails').toEqual(
            'the document was created even though there were missing required-params'
          );
        })
        .catch(e => {
          expect(e._message).toEqual('Game validation failed');
          expect(e.name).toEqual('ValidationError');
          expect(e.errors.genre.kind).toEqual('required');
        });
    });
  });

  // test away!
});
