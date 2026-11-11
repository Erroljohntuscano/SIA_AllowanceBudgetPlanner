
const request = require("supertest");
const app = require("../src/app");

describe("Allowance Budget Planner API Tests", () => {

    test("GET /health should return API status", async () => {
        const response = await request(app).get("/health");

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("ok");
        expect(response.body.version).toBe("1.0.0");
    });

    test("POST /api/calculate should calculate the budget", async () => {
        const response = await request(app)
            .post("/api/calculate")
            .send({
                allowance: 3000,
                expenses: 1200,
                remainingDays: 15
            });

        expect(response.status).toBe(200);
        expect(response.body.remainingBalance).toBe(1800);
        expect(response.body.dailyBudget).toBe(120);
    });

    test("POST /api/calculate should reject invalid expenses", async () => {
        const response = await request(app)
            .post("/api/calculate")
            .send({
                allowance: 3000,
                expenses: 4000,
                remainingDays: 15
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Expenses cannot exceed allowance.");
    });

});
