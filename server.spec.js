const request = require('supertest');
const server = require('./server');


 describe('server', () => {
    describe('GET /games', () => {
        it('should return a 200 status code', async () => {
            const res = await request(server).get('/games')
            expect(res.status).toEqual(200);
        });
        it('returned response should be type JSON', async () => {
            const res = await request(server).get('/games')
            expect(res.type).toEqual('application/json');
        });
        it('should return {games: "array of games"} in response body', async () => {
            const expected = {games: 'array of games'}
            const res = await request(server).get('/games')
            expect(res.body).toEqual(expected);
        });
    });


     describe('POST /games', () => {
        it('should return a 201 status code', async () => {
            const res = await request(server)
            .post('/games')
            .send({id:'1', title: 'game title 1', genre: 'genre 1'})
            expect(res.status).toEqual(201);
        });
        it('should return {id, title, genre} in response body', async () => {
            const expected = {id:'1', title: 'game title 1', genre: 'genre 1'}
            const res = await request(server)
            .post('/games')
            .send({id:'1', title: 'game title 1', genre: 'genre 1'})
            expect(res.body).toEqual(expected);
        });
        it('should return JSON type response', async () => {
            const res = await request(server)
            .post('/games')
            .send({id:'1', title: 'game title 1', genre: 'genre 1'})
            expect(res.type).toEqual('application/json');
        });
    });

     describe('PUT /games/:id', () => {
        it('should return a 200 status code when updating game', async () => {
            const res = await request(server)
            .put('/games/1')
            .send({id:'1', title: 'game title 1', genre: 'genre 1'})
            expect(res.status).toEqual(200);
        });
        it('should return {id, title, genre} in response body', async () => {
            const expected = {id:'1', title: 'game title 1', genre: 'genre 1'}
            const res = await request(server)
            .put('/games/1')
            .send({id:'1', title: 'game title 1', genre: 'genre 1'})
            expect(res.body).toEqual(expected);
        });
        it('should return JSON type response', async () => {
            const res = await request(server)
            .put('/games/1')
            .send({id:'1', title: 'game title 1', genre: 'genre 1'})
            expect(res.type).toEqual('application/json');
        });
    });

     describe('DELETE /games/:id', () => {
        it('should return a 200 status code when deleting game', async () => {
            const res = await request(server)
            .delete('/games/1')
            .send({id: '1'})
            expect(res.status).toEqual(200);
        });
        it('should return {deleted: "game id"} in response body', async () => {
            const expected = {deleted: '1'}
            const res = await request(server)
            .delete('/games/1')
            .send({id: '1'})
            expect(res.body).toEqual(expected);
        });
        it('should return JSON type response', async () => {
            const res = await request(server)
            .delete('/games/1')
            .send({id: '1'})
            expect(res.type).toEqual('application/json');
        });
    });
});