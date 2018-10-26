const request = require('supertest');

const server = require('./server.js');

describe('server', () => {
  it('server running', () => {
    expect(true).toBeTruthy();
    expect(false).toBeFalsy();
  });
});
