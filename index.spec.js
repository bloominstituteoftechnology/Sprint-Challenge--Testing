const request = require("supertest");

const server = require("./api/server.js");

const fakeDb = require("./data/fakeDb.js");

describe("server", () => {
    // Sanity check
    it("should return something with status code 200", async () => {
        const response = await request(server).get("/");
        expect(response).toBeTruthy();
        expect(response.status).toBe(200);
    });
});


describe("games/get", () => {

    it("should return an array", async () => {
        const response = await request(server).get("/api/games");
        expect(response).toBeTruthy();
        expect(response).toBe(200);
        expect(Array.isArray(response)).toBeTruthy();
    });

    // it("should return status code 200", async () => {
    //     const response = await request(server).get("/api/games");
    //     expect(response.status).toBe(200);
    // });

});

describe("games/post", () => {

    // it("should return status 201 given a proper game object", async () => {
    //     const newGame = {
    //         title: "Super Mario Bros. 1",
    //         genre: "Console",
    //         releaseYear: 1985
    //     };
    //     const response = await request(server).post("/api/games")
    //         .send(newGame);
    //     expect(response.status).toBe(201);
    // });

    // it("should return status 422 given incomplete game object", async () => {
    //     const badGame = {
    //         title: "Commander Keen 1"
    //     };
    //     const response = await request(server).post("/api/games")
    //         .send(badGame);
    //     expect(response.status).toBe(422);
    // });

    // it("should add to the length of games", async () => {
    //     const games = await request(server).get("api/games");

    // });

});
