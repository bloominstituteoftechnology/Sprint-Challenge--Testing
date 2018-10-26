const request = require('supertest');
const server = require('./server.js');

describe('server', () => {
  it('can run tests', () => {
    expect(1).toBeTruthy();
  })
  it('can run more tests', () => {
    expect(0).toBeFalsy();
  })
})