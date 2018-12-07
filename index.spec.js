const request = require('supertest');

const server = require('./server.js')

describe('server.js', () => {
    describe('/ route', () => {
        test('returns status code 200', async () => {
            let response = await request(server).get('/');
            expect(response.status).toBe(200);
        });
        test('returns JSON', async () => {
            let response = await request(server).get('/');
            expect(response.type).toBe('application/json');
        });
        test('returns body { api: "up" }', async () => {
            let response = await request(server).get('/');
            expect(response.body).toEqual({ api: 'up' });
        });
    });

    // describe('post endpoint', () => {
    //     test('returns JSON', async () => {
    //         let response = await request(server)
    //             .post('/')
    //             .send(({ userName: 'Yusuf' }));
    //         expect(response.type).toBe('application/json');
    //     });
    //     // test('returns status code 201 if successful', async () => {
    //     //     let response = await request(server)
    //     //         .post('/')
    //     //         .send({ userName: 'Yusuf Nafey' })
    //     //     expect(response.status).toBe(201);
    //     // });
    //     test('returns status code 500 if failed', async () => {
    //         let response = await request(server)
    //             .post('/')
    //             .send();
    //         expect(response.status).toBe(500);
    //     });
    // });

    // describe('/:id delete endpoint', () => {
    //     test('returns status code 200', async () => {
    //         let response = await request(server).delete('/1');
    //         expect(response.status).toBe(200)
    //     });
    //     test('', async () => {

    //     });
    // })
});