const mongoose = require('mongoose');

const Game = require('./Game');

describe('The Game Model', () => {
  const goodData = {
    title: 'Super Game',
    genre: 'The engagest',
    releaseDate: 'Just now',
  };
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
          console.log('deleteOne response: ', response);
        })
        .catch(e => {
          console.log('error Deleting document', e);
        });
    });

    it('If required fields are no provided return an error', () => {
      return Game.create(testData)
        .then(response => {
          console.log(response);
          expect(
            'if youo are reading this, the test fails because it was created with all the required fields. This test was suite to pass if and only if there are at lest one require-params that is no passed.'
          ).toEqual(
            'the document was created with all the required params, In order to test whether or not this case pass, please, remove at lest one required field.'
          );
        })
        .catch(e => {
          expect(e._message).toEqual('Game validation failed');
          expect(e.name).toEqual('ValidationError');
          expect(e.errors.genre.kind).toEqual('required');
        });
    });
  });

  test('Game has a method called getGAmeTitle', () => {
    const game = new Game(goodData);
    expect(game.getGameTitle()).toEqual('Super game');
  });
  // test away!
});
