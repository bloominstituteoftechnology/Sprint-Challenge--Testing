const request = require("supertest")
const db = require("../data/dbConfig")
const server = require("./server")

afterEach(async () => {
    await db("games").truncate();
});

describe("SERVER", () => {
    describe("GET /games endpoint", () => {
        it("Respond with status code 200", async () => {
            let res = await request(server).get("/games");
            expect(res.status).toBe(200);
        });
    });

    it("Respond with an empty array", async () => {
        let expected = [];
        res = await request(server).get("/games");
        expect(res.body).toEqual(expected);
    });

    it("Respond with an array of games", async () => {
        let expected = [{
            id: 1,
            title: "Halo 2",
            genre: "FPS",
            releaseYear: 2004
        },
        {
            id: 2,
            title: "Destiny",
            genre: "FPS",
            releaseYear: 2014
        }
        ];

        let res = await request(server).post("/games").send({
            title: "Halo 2",
            genre: "FPS",
            releaseYear: 2004
        })

        res = await request(server).post("/games").send({
            title: "Destiny",
            genre: "FPS",
            releaseYear: 2014
        })

        res = await request(server).get("/games")

        expect(res.body).toEqual(expected)
    })

    describe("POST /games endpoint", () => {
        it("Respond with status code 201", async () => {
            let body = {
                title: "Halo 2",
                genre: "FPS",
                releaseYear: 2004
            };

            let res = await request(server).post("/games").send(body)

            expect(res.status).toBe(201)
        })

        it("Return the ID of the game created", async () => {
            let body = {
                title: "Halo 2",
                genre: "FPS",
                releaseYear: 2004
            };

            let res = await request(server).post("/games").send(body)

            expect(res.body).toEqual([1])
        })

        it("Respond with status code 422 when incomplete", async () => {
            let body = {
                genre: "FPS",
                releaseYear: 2004
            };

            let res = await request(server).post("/games").send(body)

            expect(res.status).toBe(422)
        })
    });
});