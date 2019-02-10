const request = require('supertest');
const server = require('./server')
const db = require('../dbConfig')

describe('Testing Server Connection and Setup', () => {
    beforeAll(async () => {
        await db('games').truncate()
        await db.seed.run()

    }, 20000);
    beforeEach(async () => {
        await db('games').truncate()
        await db.seed.run()

    }, 20000);

    afterEach(async () => {
        await db('games').truncate();
        await db.seed.run();
    }, 20000);

    //Validates we get a response back from server with response code 200
    it('test server response', async () => {
        const response = await request(server).get('/')
        expect(response.status).toBe(200);
    })

    //Validates we will recieve json information from the server
    it('test response server is using json', async () => {
        const response = await request(server).get('/')
        expect(response.type).toMatch(/json/i);
    })

    //Validates that we are acutally getting a respond from the body
    it('sends a response from the body', async () => {
        const response = await request(server).get('/');
        expect(response.body).toEqual({response: 'we are ready'})
    })

})


describe('Testing database connection', () => {

    //Before Each allows you to make sure you have cleanup before each test run
    beforeEach(async () => {
        await db('games').truncate()
        await db.seed.run()

    });
    //After each should cleanup after each test has ran
    afterEach(async () => {
        await db('games').truncate();
        await db.seed.run();
    });


    it('sends a response from the arcade database', async () => {
        const response = await request(server).get('/games');
        expect(response.status).toBe(200);
    })

    it('responds with body of arcade games', async () => {
        const response = await request(server).get('/games');
        expect(response.body).toEqual([
            {
                id: 1,
                title: "Pacman",
                genre: "Arcade",
                releaseDate: 1980
            }
        ]);
    })

})

describe('Post Function', () => {
    beforeAll(async () => {
        await db('games').truncate()
        await db.seed.run()

    });

    beforeEach(async () => {
        await db('games').truncate()
        await db.seed.run()

    });
    //After each should cleanup after each test has ran
    afterEach(async () => {
        await db('games').truncate();
        await db.seed.run();
    });
//Validates that it responds with a 200 and sends back array of the data
    it('responds with 200 returns an array', async () => {
        const response = await request(server).get('/games');

        const games = await response.body;

        const expected = games.map(game => game);

        expect(games).toEqual(expected);
    })
    //Validates we are making a post to games while getting repsonse 201
    it('responds with 201', async () => {

        const body = {
            title: 'Space Invaders',
            genre: 'Arcade',
            releaseDate: 1978
        }
        const response = await request(server)
            .post('/games')
            .send(body);
        expect(response.status).toBe(201);
    })
//Validates that we are sending back the error status code 422
    it('responds with 422', async () => {
        const title = {
            title: '',
            genre: 'Arcade',
            releaseDate: 1978
        }
        const response = await request(server)
            .post('/games')
            .send(title);
        expect(response.status).toBe(422);
    })
    // Validates game title is unique - Stretch items
    it('responds with 405 for unique game.title', async () => {
        const arcadeGame = {
            title: 'Pacman',
            genre: 'Arcade',
            releaseDate: 1980
        }
        const response = await request(server)
            .post('/games')
            .send(arcadeGame)
        expect(response.status).toBe(405);

    })

})


describe('Get By Id function', () => {
    beforeAll(async () => {
        await db('games').truncate()
        await db.seed.run()

    });

    beforeEach(async () => {
        await db('games').truncate()
        await db.seed.run()

    });
    //After each should cleanup after each test has ran
    afterEach(async () => {
        await db('games').truncate();
        await db.seed.run();
    });

//Validates that we can get by id
    it('should get by id ', async () => {
        const response = await request(server).get('/games/1')
        expect(response.status).toBe(200)

    })

})
describe('Delete Function', () => {
    beforeAll(async () => {
        await db('games').truncate()
        await db.seed.run()

    });

    beforeEach(async () => {
        await db('games').truncate()
        await db.seed.run()

    });
    //After each should cleanup after each test has ran
    afterEach(async () => {
        await db('games').truncate();
        await db.seed.run();
    });
    //Validates that we can delete by id
    it('responds with 200', async () => {
        const response = await request(server).delete('/games/1')

        expect(response.status).toBe(200)
    })

    it('responds with a 404 game doesnt exist', async () => {
        const response = await request(server).delete('/games/9')
        expect(response.status).toBe(404)
    })
})

