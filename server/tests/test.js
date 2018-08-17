const request = require('supertest');

const server = require('../index.js');

describe('Root', () => {
  it('should return an array of game objects', async () => {
    const response = await request(server).get('/');

    console.log(response.body);
    expect(typeof response.body).toEqual('object');
  })
})
