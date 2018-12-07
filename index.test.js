

//== Test Suite: Game API Server ===============================================

//-- Dependencies --------------------------------
const request = require('supertest');
const config = require('./config.js');


//== Tests =====================================================================

describe('Test Game API Server', () => {

//-- Test Get Games Endpoint ---------------------
    describe('Test Retrieve Games', () => {
        // Constants
        const endPoint = config.URL_API_GAMES;
        // Configuration
        beforeEach(async function () {
            // Clear all games and create example games
        });
        // Behavior Tests
        it('responds with status code 200', async function () {
            expect().toBeTruthy();
        });
        it('responds with JSON object', async function () {
            expect().toBeTruthy();
        });
        it('responds with Array', async function () {
            expect().toBeTruthy();
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
