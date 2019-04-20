const request = require('supertest');

const server = require('./server.js');

describe('the route handlers', () => {
    describe('get request', () => {
        it('it exists', () => {
            request(server).get('/games')
                .then(response => {
                    expect(response).toBeTruthy();
                })
                .catch(err => {
                    console.log(err);
                    console.log('get request test #3 failure.');
                })
        });
        it('responds with 200 status code', () => {
            request(server).get('/games')
                .then(response => {
                    expect(response.status).toBe(200);
                    // console.log(response.status);
                })
                .catch(err => {
                    console.log(err);
                    console.log('get request test #1 failed');
                })
        });
        it('returns json', () => {
            request(server).get('/games')
                .then(response => {
                    expect(response.type).toMatch(/json/i);
                })
                .catch(err => {
                    console.log(err);
                    console.log('get request test #2 failure.');
                })
        });
    })
    describe('post request', () => {
        const body = {
            title: 'tetris',
            genre: 'arcade',
            releaseYear: 1984,
        };
        it('it exists', () => {
            request(server).post('/games/add-game').send(body)
                .then(response => {
                    expect(response).toBeTruthy();
                })
                .catch(err => {
                    console.log(err);
                    console.log('post request test #1 failure.');
                })
        });
        it('responds with 201 status code', () => {
            request(server).post('/games/add-game').send(body)
                .then(response => {
                    expect(response.status).toBe(201);
                })
                .catch(err => {
                    console.log(err);
                    console.log('post request test #2 failure.');
                })
        });
        it('responds with error code with wrong body request', () => {
            const wrongBody = { };
            request(server).post('/games/add-game').send(wrongBody)
                .then(response => {
                    expect(response.status).not.toBe(201);
                })
                .catch(err => {
                    console.log(err);
                    console.log('post request test #3 failure.');
                })
        });
    })
})