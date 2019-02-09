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
});