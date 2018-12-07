const request = require('supertest');

const server = require('./server');

describe('/games POST', () => {
    it('should return a stauts code of 422', async () => {
        const body = { releaseYear: 1990 };
        const response = await request(server)
            .post('/games')
            .send(body)
        expect(response.status).toBe(422)
    })

    it('should return a stauts code of 201', async () => {
        const body = {title: 'Pacman', genre: 'Arcade', releaseYear: 1980};
        const response = await request(server)
            .post('/games')
            .send(body);
        expect(response.status).toBe(201);
    })

    it('should return a JSON', async () => {
        const body = {title: 'Pacman', genre: 'Arcade', releaseYear: 1980};
        const response = await request(server)
            .post('/games')
            .send(body);
        expect(response.type).toBe('application/json');
    })

    it('should return same object as inputed', async () => {
        const body = {title: 'Pacman', genre: 'Arcade', releaseYear: 1980}
        const response = await request(server)
            .post('/games')
            .send(body)
        expect(response.body).toEqual(body);
    })
})

describe('/games GET route', () => {
    it('should return a status code of 200', async () => {
        const response = await request(server).get('/games')
        expect(response.status).toBe(200);
    })

    it('should return an JSON', async () => {
        const response = await request(server).get('/games');
        expect(response.type).toBe('application/json');
    })

    it('should return a empty array', async () => {
        const response = await request(server).get('/games')
        expect(response.body).toEqual([]);
    })

    it('should return an array', async () => {
        const body = {title: 'Pacman', genre: 'Arcade', releaseYear: 1980};
        const response = await request(server)
            .get('/games')
            .send(body);
        expect(response.body).toEqual([body])
    })
})
