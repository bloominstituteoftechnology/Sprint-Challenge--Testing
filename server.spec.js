const request = require('supertest');
const getType = require('jest-get-type');
const server = require('./server.js');

const defaultGame = {
    title: 'Pacman',
    genre: 'Arcade',
    releaseYear: 1980
  };


  describe('server.js', () => {
    it('returns status code 200 (OK)', async () => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
    });


});