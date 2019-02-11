const math = require('./games.js')

/*  ### POST /games

- [ ] The `POST /games` endpoint should take in an object that looks like this

  ```js
  {
    title: 'Pacman', // required
    genre: 'Arcade', // required
    releaseYear: 1980 // not required
  }

*/
/* test syntax  

test('description', () => {
  expect(games.[functionName]()).toEqual(`value`);
})
it('description', () => {
  expect(games.[functionName]()).toEqual(`value`);
})
*/

// In the route handler
// validates that the required fields are included inside the body
  it('validates that the required fields are included inside the body', () => {
  expect(games.checkKey1()).toEqual('title');
  expect(games.checkKey2()).toEqual('genre');
  expect(games.checkKey3()).toEqual('releaseYear');
  });

  // returns a `422` status code if the information is incomplete
  it('returns a `422` status code if the information is incomplete', () => {
    expect(games.checkStatusCodeMissingData()).toEqual(422);
  });

  // verifies that the endpoint returns the correct HTTP status code when receiving correct and incorrect game data
  it('verifies endpoint returns the correct HTTP status code for correct game data', () => {
    expect(games.checkStatusCodeGoodData()).toEqual(`value`);
  });

  it('verifies endpoint returns the correct HTTP status code for incorrect game data', () => {
    expect(games.checkStatusCodeBadData()).toEqual(`value`);
  });

// // ### GET /games

// endpoint should:
//return the list of games and HTTP status code 200
it('returns the list of games and HTTP status code 200', () => {
  expect(games.[functionName]()).toEqual(`value`);
})

// Returns an array, even if there are no games stored
// ☞ 0cc30682-0a1f-482b-b337-2fe2e4ddd6c8
describe('arrayContaining', () => {
  const expected =['title','genre','releaseYear']; // ??expect values or count elements??
  it('matches even if received contains additional elements', () => {
    expect(
      games.checkForArray().arrayContaining(array)
  })
})
/*
describe('arrayContaining', () => {
  const expected = ['Alice', 'Bob'];
  it('matches even if received contains additional elements', () => {
    expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(expected));
  });
  it('does not match if received does not contain expected elements', () => {
    expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected));
  });
});
*/

// If there are no games to return, the endpoint should return an empty array.
// ☞ 3d662dbe-5e64-459c-9301-3ba7646d8742

describe('arrayNotContaining', () => {
  const expected =[];
})
