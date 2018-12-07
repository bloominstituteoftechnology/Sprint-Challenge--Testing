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
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    // it("should return a JSON-type response", async () => {
    //     const response = await request(server).get("/api/games");
    //  // expect(response).toBe(200);
    //     expect(response.body.type).toBe("application/json");
    // });

    it("should return status code 200", async () => {
        const response = await request(server).get("/api/games");
        expect(response.status).toBe(200);
    });

    it("if games isn't empty, test properties of the first object", async () => {
        const response = await request(server).get("/api/games");
        if (response.body.length > 0) {             // I tested that this works whether the condition is true or not
            const firstGame = response.body[0];
            expect(typeof firstGame).toBe("object");
            expect(firstGame.title).toBeTruthy;
            expect(firstGame.genre).toBeTruthy;
        }
    });

});

describe("games/post", () => {

    it("should return status 201 given a proper game object", async () => {
        const newGame = {
            title: "Super Mario Bros. 1",
            genre: "Console",
            releaseYear: 1985
        };
        const response = await request(server).post("/api/games")
            .send(newGame);
        expect(response.status).toBe(201);
    });

    it("should return status 422 given incomplete game object", async () => {
        const badGame = {
            title: "Commander Keen 1"
        };
        const response = await request(server).post("/api/games")
            .send(badGame);
        expect(response.status).toBe(422);
    });

    it("should add 1 to the length of games", async () => {
        const games = await request(server).get("/api/games");
        const len = games.body.length;

        const newGame = {
            title: "Super Mario Bros. 1",
            genre: "Console",
            releaseYear: 1985
        };
        await request(server).post("/api/games")
            .send(newGame);

        const response = await request(server).get("/api/games");
        expect(response.body.length).toBe(len + 1);
    });

});
