const server = require("./server");
const request = require("supertest");

describe('server.js', () => {
    describe("POST endpoint to /games", () => {
        it("should return status 201 on success", async() => {
        const game = {
            title: "Call of Duty World at War",
            genre: "First Person Shooter"
        };

        const response = await request (server).post('/games').send(game);

        expect(response.status).toEqual(201);
    });
        it("should return status 422 if information is incomplete", async() => {
        const game = {
            title: "Super Mario Kart",
            genre: "Multiplayer"
        };

        const response = await request (server).post('/games').send(game);

        expect(response.status).toEqual(422);
    });
        it("should return JSON", async() => {
        const game = {
            title: "NBA 2K19",
            genre: "Sports"
        };

        const response = await request (server).post('/games').send(game);

        expect(response.status).toEqual("application/json");
        });
    });//end of POST tests


    describe('GET /games tests', () => {
        it("should return status 200", async () => {

        const response = await request(server).get('/games');

        expect(response.status).toEqual(200);
        });

            it("should return an array", async () => {
            const response = await request(server).get('/games');
            if(response.body.length){
                expect(response.body)
                .toEqual(expect.arrayContaining([
                    expect.objectContaining({
                    title: expect.any(String),
                    genre: expect.any(String),
                    })
                ]));
            }else{
                expect(Array.isArray(response.body)).toBeTruthy();
            }
            });

            it("should return games", async () => {

                const response = await request(server).get('/games');
        
                expect(response.status).toEqual(games);
                });
    });//end of GET games tests
}); //end of server tests