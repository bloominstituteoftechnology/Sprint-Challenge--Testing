

//== Test Suite: Game API Server ===============================================

//-- Dependencies --------------------------------
const request = require('supertest');
const config     = require('./config.js'     );
const dataAccess = require('./data_access.js');
const server     = require('./server.js'     );


//== Tests =====================================================================

describe('Test Game API Server', () => {

//-- Test Get Games Endpoint ---------------------
    describe('Test Retrieve Games', () => {
        // Constants
        const endPoint = config.URL_API_GAMES;
        // Configuration
        beforeEach(async function () {
            await dataAccess.clear();
            await dataAccess.create({
                [config.FIELD_TITLE]: 'Test Game 1',
                [config.FIELD_GENRE]: 'Test Genre' ,
            });
            await dataAccess.create({
                [config.FIELD_TITLE]: 'Test Game 2',
                [config.FIELD_GENRE]: 'Test Genre' ,
            });
        });
        // Behavior Tests
        it('responds with status code 200', async function () {
            const response = await request(server).get(endPoint);
            expect(response.status).toBe(200);
        });
        it('responds with JSON object', async function () {
            const response = await request(server).get(endPoint);
            expect(response.type).toBe('application/json');
        });
        it('responds with Array', async function () {
            const response = await request(server).get(endPoint);
            const gamesList = response.body.games;
            expect(Array.isArray(gamesList)).toBeTruthy();
        });
        it('responds with all game objects', async function () {
            const response = await request(server).get(endPoint);
            const gamesList = response.body.games;
            expect(gamesList.length).toBe(2);
        });
        it('responds with correct data for each game', async function () {
            const response = await request(server).get(endPoint);
            const testGame = response.body.games[0];
            expect(gamesList.length).toBeEqual({
                [config.FIELD_ID   ]: 1            ,
                [config.FIELD_TITLE]: 'Test Game 1',
                [config.FIELD_GENRE]: 'Test Genre' ,
            });
        });
    });

//-- Test Post (create) Game Endpoint ------------
    describe('Test Create Game', () => {
        // Constants
        const endPoint = config.URL_API_GAMES;
        // Configuration
        beforeEach(async function () {
            // Clear all games
        });
        // Behavior Tests
        it('responds with status code 201', async function () {
            expect().toBeTruthy();
        });
        it('checks for incorrect data (422)', async function () {
            expect().toBeTruthy();
        });
        it('responds with JSON object', async function () {
            expect().toBeTruthy();
        });
        it('responds with id of created game', async function () {
            expect().toBeTruthy();
        });
    });
});
