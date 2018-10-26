const server = require('./api/server');
const request = require('supertest');

/// ----- CRUD ENDPOINT TESTS -----
// --- Test Test for Test GET Endpoint ---
describe('GET /testmebaby/149 Test Endpoint', () => {
    beforeAll( async () => {
        return response = await request(server).get('/testmebaby/149');
    });

    describe('Response Type and Status', () => {
        it('Should respond with JSON', () => {
            expect(response.type).toBe('application/json');
        });
    
        it('Should respond with a status code of 200 (OK)', () => {
            expect(response.status).toBe(200);
        });
    });

    it('Should respond with One More Time', () => {
        expect(response.body).toBe('One More Time');
    });
})

// GET All Games Endpoint
describe('GET /games Endpoint', () => {
    beforeAll( async () => {
        return response = await request(server).get('/games');
    });

    describe('Response Type and Status', () => {
        it('Should respond with JSON', () => {
            expect(response.type).toBe('application/json');
        });
    
        it('Should respond with a status code of 200 (OK)', () => {
            expect(response.status).toBe(200);
        });
    });

    describe('Random testing of three units', () => {
        beforeAll( async () => {
            return randomIndex = () => Math.floor(Math.random() * response.body.length);
        });

        it('Should respond with an array of objects', () => {
            expect(Array.isArray(response.body)).toBeTruthy;
    
            // Test the type of three random units in the response array;
            expect(typeof response.body[randomIndex()]).toBe('object');
            expect(typeof response.body[randomIndex()]).toBe('object');
            expect(typeof response.body[randomIndex()]).toBe('object');
        });
    
        it('Should have objects in its array response with id, title, genre, and releaseYear properties', () => {
    
            // Test the keys of three random units in the response array;
            expect(Object.keys(response.body[randomIndex()])).toEqual(['id','title','genre','releaseYear']);
            expect(Object.keys(response.body[randomIndex()])).toEqual(['id','title','genre','releaseYear']);
            expect(Object.keys(response.body[randomIndex()])).toEqual(['id','title','genre','releaseYear']);
        });
    })
    
});

// Post Game Endpoint
describe('POST /games Endpoint', () => {
    beforeAll( async () => {
        return response = await request(server).post('/games').send({
            title: 'Joust', 
            genre: 'Arcade',
            releaseYear: 1982
        });
    });


    it('Should respond with JSON', () => {
        expect(response.type).toBe('application/json');
    });
    

    // Failure
    describe('Endpoint Failure Tests', () => {
        // Failure Responses
        beforeAll( async () => {
            return failureResponses = {
                missingTitle: await request(server).post('/games').send({ title: 'Centipede', releaseYear: 1980 }),
                missingGenre: await request(server).post('/games').send({ genre: 'Arcade', releaseYear: 1980 }),
                missingBoth: await request(server).post('/games').send({ releaseYear: 1980 }),
            }
        });

        it ('Should respond with a status code of 422 (Uprocessible Entity) if not sent a title or genre', () => {
            const errorCode = 422;

            expect(failureResponses.missingTitle.status).toBe(errorCode);
            expect(failureResponses.missingGenre.status).toBe(errorCode);
            expect(failureResponses.missingBoth.status).toBe(errorCode);
        })

        it ('Should respond with an errorMessage if not sent a title or genre', () => {
            const errorMessage = {errorMessage: "You must provide a title and genre when adding a game."};

            expect(failureResponses.missingTitle.body).toEqual(errorMessage);
            expect(failureResponses.missingGenre.body).toEqual(errorMessage);
            expect(failureResponses.missingBoth.body).toEqual(errorMessage);
        })

    })

    // Success
    describe('Endpoint Success Tests', () => {
        beforeAll( async () => {
            return missingReleaseYear = await request(server).post('/games').send({ title: 'Galaga', genre: 'Arcade' });
        });

        it('Should respond with a status code of 201 (Created) after a successful post', () => {
            expect(response.status).toBe(201);

            // Should still be successful without the release year
            expect(missingReleaseYear.status).toBe(201);
        });

        it('Should respond with the unit after the unit is added.', () => {
            expect({ title: response.body.title, genre: response.body.genre, releaseYear: response.body.releaseYear }).toEqual({
                title: 'Joust', 
                genre: 'Arcade',
                releaseYear: 1982
            });

            // Should still be successful without the release year
            expect({ title: missingReleaseYear.body.title, genre: missingReleaseYear.body.genre, releaseYear: missingReleaseYear.body.releaseYear }).toEqual({
                title: 'Galaga', 
                genre: 'Arcade',
                releaseYear: ''
            });
        });

        it('Should have increased the size of the unit resource by 1', async () => {
            const initialGetResponse = await request(server).get('/games');
            await request(server).post('/games').send({ title: 'Centipede', genre: 'Arcade', releaseYear: 1980 });
            const finalGetResponse = await request(server).get('/games');

            expect(finalGetResponse.length).toBe(initialGetResponse.length + 1);
        });
        
    })
})