const mongoose = require('mongoose');
const config = require('../config.js');
const { dbuser, dbpassword } = config.secret

const Game = require('./Game');

describe('The Game Model', () => {
  beforeAll(() => {
    return mongoose
      .connect(`mongodb://${dbuser}:${encodeURIComponent(dbpassword)}@ds016718.mlab.com:16718/test`)
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

  it('runs the tests', () => {});

  // test away!
});
